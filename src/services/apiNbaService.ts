import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { format } from 'date-fns';

import {
  IFetchScoreboardGamesData,
  IScoreboardGamesRender,
  IFetchTeamsStandingsResponse,
  ITeamsStandingsRender,
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
          ({ id, date, status, teams, scores }) => ({
            gameId: id,
            startTime: date.start,
            statusGame: status.long,
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
      query: () => 'standings?league=standard&season=2021',
      transformResponse: (rawResult: { response: IFetchTeamsStandingsResponse[] }) =>
        rawResult.response.map(({ team, win, loss }) => ({
          teamId: team.id,
          fullName: team.name,
          logo: team.logo,
          win: win.total,
          loss: loss.total,
        })),
    }),
  }),
});

export const { useFetchScoreboardGamesQuery, useFetchTeamsStandingsQuery } = apiNba;
