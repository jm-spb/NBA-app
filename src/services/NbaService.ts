import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  IScoreboardFullData,
  IScoreboardGames,
  // IScoreboardDate,
} from '../types/scoreboardGames';

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

    fetchScoreboardGames: builder.query<IScoreboardGames[], string[]>({
      async queryFn(date, _queryApi, _extraOptions, fetchWithBQ) {
        const todayGamesResponse = await fetchWithBQ(`games/date/${date[0]}`);
        const tomorrowGamesResponse = await fetchWithBQ(`games/date/${date[1]}`);

        const todayGames = todayGamesResponse.data as IScoreboardFullData;
        const tomorrowGames = tomorrowGamesResponse.data as IScoreboardFullData;
        const allGames = [...todayGames.api.games, ...tomorrowGames.api.games];

        const result = allGames.map(({ gameId, startTimeUTC, hTeam, vTeam }) =>
          Object.assign({}, { gameId, startTimeUTC, hTeam, vTeam })
        );

        return { data: result };
      },
    }),
  }),
});

export const { useFetchTeamsQuery, useFetchScoreboardGamesQuery } = nbaApi;
