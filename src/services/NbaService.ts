import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IScoreboardGames, IScoreboardResponse } from '../types/scoreboardGames';
import { ITeamsRenderData, ITeamsResponseData } from '../types/teamsHeader';

export const nbaApi = createApi({
  reducerPath: 'nbaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-nba-v1.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
      headers.set('x-rapidapi-key', `${process.env.REACT_APP_NBA_API_KEY}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchTeams: builder.query<ITeamsRenderData[], string>({
      query: () => 'teams/league/standard',
      transformResponse: (rawResult: { api: { teams: ITeamsResponseData[] } }) =>
        rawResult.api.teams
          .filter((team) => team.logo && team.leagues.standard.divName)
          .map(
            ({
              fullName,
              teamId,
              logo,
              leagues: {
                standard: { divName },
              },
            }) => Object.assign({}, { fullName, teamId, logo, divName })
          ),
    }),
    fetchScoreboardGames: builder.query<IScoreboardGames[], string>({
      query: () => 'games/date/2021-12-05',
      transformResponse: (rawResult: { api: { games: IScoreboardResponse[] } }) =>
        rawResult.api.games.map(({ gameId, startTimeUTC, hTeam, vTeam }) =>
          Object.assign({}, { gameId, startTimeUTC, hTeam, vTeam })
        ),
    }),
  }),
});

export const { useFetchTeamsQuery, useFetchScoreboardGamesQuery } = nbaApi;
