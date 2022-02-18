import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IScoreboardFullData, IScoreboardGames } from '../types/apiNbaTypes';

export const apiNba = createApi({
  reducerPath: 'apiNba',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://api-nba-v1.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', 'api-nba-v1.p.rapidapi.com');
      headers.set('x-rapidapi-key', `${process.env.REACT_APP_NBA_API_KEY}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchScoreboardGames: builder.query<IScoreboardGames[], string[]>({
      async queryFn(date, _queryApi, _extraOptions, fetchWithBQ) {
        const currentDayResponse = await fetchWithBQ(`games/date/${date[0]}`);
        const nextDayResponse = await fetchWithBQ(`games/date/${date[1]}`);

        const currentDayGames = currentDayResponse.data as IScoreboardFullData;
        const nextDayGames = nextDayResponse.data as IScoreboardFullData;
        const allGames = [...currentDayGames.api.games, ...nextDayGames.api.games];

        const result = allGames.map(
          ({ gameId, startTimeUTC, hTeam, vTeam, statusGame }) => ({
            gameId,
            startTimeUTC,
            hTeam,
            vTeam,
            statusGame,
          }),
        );

        return { data: result };
      },
    }),
  }),
});

export const { useFetchScoreboardGamesQuery } = apiNba;