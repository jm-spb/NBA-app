import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { format } from 'date-fns';

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
    fetchScoreboardGames: builder.query<IScoreboardGames[][], string[]>({
      async queryFn(gameDates, _queryApi, _extraOptions, fetchWithBQ) {
        const currentDayResponse = await fetchWithBQ(`games/date/${gameDates[0]}`);
        const nextDayResponse = await fetchWithBQ(`games/date/${gameDates[1]}`);

        // ** in currentDayResponse (or nextDayResponse) fetched games can be with different dates. So at first we need to create an array with all games and then filtered it, and create subarrays, grouped by date

        const currentDayGames = currentDayResponse.data as IScoreboardFullData;
        const nextDayGames = nextDayResponse.data as IScoreboardFullData;
        const allGames = [...currentDayGames.api.games, ...nextDayGames.api.games];

        // return only necessary properties
        const unfilteredGames = allGames.map(
          ({ gameId, startTimeUTC, hTeam, vTeam, statusGame }) => ({
            gameId,
            startTimeUTC,
            hTeam,
            vTeam,
            statusGame,
          }),
        );

        // create an array with grouped games by each date
        const groupedGames: IScoreboardGames[][] = gameDates.map((gameDate) =>
          unfilteredGames.filter(
            ({ startTimeUTC }) =>
              format(new Date(startTimeUTC), 'yyyy-MM-dd') === gameDate,
          ),
        );

        return { data: groupedGames };
      },
    }),
  }),
});

export const { useFetchScoreboardGamesQuery } = apiNba;
