import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITeamsRenderData, ITeamsResponseData } from '../types/teams';

export const nbaApi = createApi({
  reducerPath: 'nbaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-nba-v1.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
      headers.set('x-rapidapi-key', `${process.env.REACT_APP_NBA_API_KEY}`);

      return headers;
    }
  }),
  endpoints: (builder) => ({
    fetchTeams: builder.query<ITeamsRenderData[], string>({
      query: () => 'teams/league/standard',
      transformResponse: (rawResult: { api: { teams: ITeamsResponseData[] } }) =>
        rawResult.api.teams
          .filter((team) => team.logo && team.leagues.standard.divName)
          .map(({ fullName, teamId, logo, leagues: { standard: { divName } } }) =>
            Object.assign({}, { fullName, teamId, logo, divName })
          )
    })
  })
});

export const { useFetchTeamsQuery } = nbaApi;
