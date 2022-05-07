import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { format } from 'date-fns';

import {
  IFetchScoreboardGamesData,
  IScoreboardGamesRender,
  IFetchTeamsStandingsResponse,
  ITeamsStandingsRender,
  IGameDetailsTeamStatsResponse,
  BaseStatsType,
  AdditionalStatsType,
  IGameDetailsTeamStatsRender,
  IFetchGameBoxScoreApiResponse,
  IFetchNbaGameBoxScore,
} from '../types/apiNbaTypes';

export const apiNba = createApi({
  reducerPath: 'apiNba',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-nba-v1.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
      headers.set('x-rapidapi-key', `${process.env.REACT_APP_NBA_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchScoreboardGames: builder.query<IScoreboardGamesRender[][], string[]>({
      async queryFn(gameDates, _queryApi, _extraOptions, fetchWithBQ) {
        const currentDayResponse = await fetchWithBQ(`games?date=${gameDates[0]}`);
        const nextDayResponse = await fetchWithBQ(`games?date=${gameDates[1]}`);

        // ** in currentDayResponse (or nextDayResponse) fetched games can be with different dates. So at first we need to create an array with all games and then filtered it, and create subarrays, grouped by date

        const currentDayGames = currentDayResponse.data as IFetchScoreboardGamesData;
        const nextDayGames = nextDayResponse.data as IFetchScoreboardGamesData;

        const allGames = [...currentDayGames.response, ...nextDayGames.response];

        // return only necessary properties
        const unfilteredGames: IScoreboardGamesRender[] = allGames.map(
          ({ id, date, status, teams, scores, season, arena, officials }) => ({
            gameId: id,
            startTime: date.start,
            statusGame: status.long,
            season,
            teamsInfo: {
              homeTeamInfo: {
                teamId: teams.home.id,
                fullName: teams.home.name,
                shortName: teams.home.code,
                logo: teams.home.logo,
                points: scores.home.points,
              },
              visitorTeamInfo: {
                teamId: teams.visitors.id,
                fullName: teams.visitors.name,
                shortName: teams.visitors.code,
                logo: teams.visitors.logo,
                points: scores.visitors.points,
              },
            },
            summary: {
              date: date.start,
              arena,
              officials,
              scores: [
                {
                  team: teams.visitors.code,
                  linescore: scores.visitors.linescore,
                  final: scores.visitors.points,
                },
                {
                  team: teams.home.code,
                  linescore: scores.home.linescore,
                  final: scores.home.points,
                },
              ],
            },
          }),
        );

        // create an array with grouped games by each date
        const groupedGames: IScoreboardGamesRender[][] = gameDates.map((gameDate) =>
          unfilteredGames.filter(
            ({ startTime }) => format(new Date(startTime), 'yyyy-MM-dd') === gameDate,
          ),
        );

        return { data: groupedGames };
      },
    }),

    fetchTeamsStandings: builder.query<ITeamsStandingsRender[], string>({
      query: (season) => `standings?league=standard&season=${season}`,
      transformResponse: (rawResult: { response: IFetchTeamsStandingsResponse[] }) =>
        rawResult.response.map(
          ({ team, win, loss, gamesBehind, streak, winStreak, conference, division }) => {
            let formatedNickname = team.nickname.toLowerCase();
            if (formatedNickname === '76ers') formatedNickname = 'sixers';
            if (formatedNickname === 'trail blazers') formatedNickname = 'blazers';
            return {
              teamId: team.id,
              fullName: team.name,
              nickName: formatedNickname,
              shortName: team.code,
              logo: team.logo,
              totalWin: win.total,
              homeWin: win.home,
              awayWin: win.away,
              totalLoss: loss.total,
              homeLoss: loss.home,
              awayLoss: loss.away,
              winPercentage: win.percentage,
              lastTenWin: win.lastTen,
              gamesBehind,
              streak,
              winStreak,
              conference: {
                name: conference.name,
                rank: conference.rank,
                confWin: conference.win,
                confLoss: conference.loss,
              },
              division: {
                name: division.name,
                rank: division.rank,
                divisionWin: division.win,
                divisionLoss: division.loss,
              },
            };
          },
        ),
    }),

    fetchNbaGameDetails: builder.query<IGameDetailsTeamStatsRender, string>({
      async queryFn(geamId, _queryApi, _extraOptions, fetchWithBQ) {
        const fetchedGameSummary = await fetchWithBQ(`games/statistics?id=${geamId}`);
        const fetchedGameSummaryTyped =
          fetchedGameSummary.data as IGameDetailsTeamStatsResponse;

        const baseStatsArray: BaseStatsType[] = [];
        const additionalStatsArray: AdditionalStatsType[] = [];

        fetchedGameSummaryTyped.response.forEach(
          ({ team: { id, name, logo }, statistics }) => {
            const teamInfo = { id, name, logo };
            const {
              fastBreakPoints,
              pointsInPaint,
              biggestLead,
              secondChancePoints,
              pointsOffTurnovers,
              longestRun,
              ...rest
            } = statistics[0];
            const additionalStats = {
              ...teamInfo,
              fastBreakPoints,
              pointsInPaint,
              biggestLead,
              secondChancePoints,
              pointsOffTurnovers,
              longestRun,
            };
            const baseStats = { ...teamInfo, ...rest };
            baseStatsArray.push(baseStats);
            additionalStatsArray.push(additionalStats);
          },
        );

        const result = {
          baseStats: [...baseStatsArray],
          additionalStats: [...additionalStatsArray],
        };

        return { data: result };
      },
    }),

    fetchGameBoxScore: builder.query<IFetchNbaGameBoxScore[][], string>({
      query: (gameId) => `players/statistics?game=${gameId}`,
      transformResponse: (rawResult: { response: IFetchGameBoxScoreApiResponse[] }) => {
        const response = rawResult.response.map(({ player, team, game, ...rest }) => ({
          gameId: game.id,
          firstname: player.firstname,
          lastname: player.lastname,
          teamName: team.name,
          minutesToSort: Number(rest.min && rest.min.split(':').join('')),
          ...rest,
        }));

        const teamsNames = Array.from(new Set(response.map(({ teamName }) => teamName)));

        // 1. Create an array of two arrays of players filtered by team
        // 2. Sort players by played minuntes (only bench players, starters remains the same order)
        const filteredPlayersByTeam = teamsNames.map((team) =>
          response
            .filter(({ teamName }) => team === teamName)
            .sort((playerOne, playerTwo) => {
              if (playerOne && !playerOne.pos && playerTwo && !playerTwo.pos)
                return playerTwo.minutesToSort - playerOne.minutesToSort;
              return 0;
            }),
        );

        return filteredPlayersByTeam;
      },
    }),
  }),
});

export const {
  useFetchScoreboardGamesQuery,
  useFetchTeamsStandingsQuery,
  useFetchNbaGameDetailsQuery,
  useFetchGameBoxScoreQuery,
} = apiNba;
