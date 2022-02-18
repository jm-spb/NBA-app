import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ITeamsBaseInfoResponseData } from '../types/apiBasketballTypes';

export const apiBasketball = createApi({
  reducerPath: 'apiBasketball',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api-basketball.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', 'api-basketball.p.rapidapi.com');
      headers.set('x-rapidapi-key', `${process.env.REACT_APP_NBA_API_KEY}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchTeamsBaseInfo: builder.query({
      query: () => 'standings?league=12&season=2021-2022',
      transformResponse: (rawResult: { response: ITeamsBaseInfoResponseData[][] }) =>
        rawResult.response[0]
          .filter(
            ({ group }) =>
              group.name !== 'Western Conference' && group.name !== 'Eastern Conference',
          )
          .map(
            ({
              team: { id, name: teamName, logo },
              group: { name: divisionName },
              games: {
                win: { total: winGames },
                lose: { total: loseGames },
              },
            }) => ({
              id,
              teamName,
              logo,
              divisionName,
              winGames,
              loseGames,
            }),
          ),
    }),
  }),
});

export const { useFetchTeamsBaseInfoQuery } = apiBasketball;
