import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IFetchNbaPlayersStatsParams,
  IPlayersNames,
  IFetchPlayersNamesApiResponse,
} from '../types/apiNbaStats';
import { IPlayersStatsTableDataSource } from '../types/stats';
import { createTableDataSource } from '../utils/stats';

export const apiNbaStats = createApi({
  reducerPath: 'apiNbaStats',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://nba-stats4.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', 'nba-stats4.p.rapidapi.com');
      headers.set('x-rapidapi-key', `${process.env.REACT_APP_NBA_API_KEY}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchPlayersStats: builder.query<
      IPlayersStatsTableDataSource[] | null,
      IFetchNbaPlayersStatsParams
    >({
      async queryFn(
        { teamShortName, selectedSeason, seasonType },
        _queryApi,
        _extraOptions,
        fetchWithBQ,
      ) {
        if (teamShortName) {
          const playersStatsApiResponse = await fetchWithBQ(
            `${seasonType}/?team_abbreviation=${teamShortName}&league_id=00&season_id=${selectedSeason}`,
          );
          if (playersStatsApiResponse.error)
            return { error: playersStatsApiResponse.error };

          const playersStats =
            playersStatsApiResponse.data as IPlayersStatsTableDataSource[];
          const playersIds = playersStats.map(({ player_id }) => player_id);

          const playersNames: IPlayersNames[] = [];
          for (let i = 0; i < playersIds.length; i++) {
            // use await in for loop to prevent function from sending an excessive amount of requests in parallel (max: 10 req/sec)
            // eslint-disable-next-line no-await-in-loop
            const playersNamesApiResponse = await fetchWithBQ(`players/${playersIds[i]}`);
            if (playersNamesApiResponse.error)
              return { error: playersNamesApiResponse.error };

            const fetchedPlayersNames =
              playersNamesApiResponse.data as IFetchPlayersNamesApiResponse;

            playersNames.push({
              id: fetchedPlayersNames.id,
              full_name: fetchedPlayersNames.full_name,
            });
          }

          const result = createTableDataSource(playersStats, playersNames);
          return { data: result };
        }
        return { data: null };
      },
    }),
  }),
});

export const { useFetchPlayersStatsQuery } = apiNbaStats;
