import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  IFetchNbaPlayersStatsParams,
  INbaPlayersNamesRender,
  INbaPlayersNamesResponse,
} from '../types/apiNbaStats';
import { IStatsTableDataSource } from '../types/stats';
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
    fetchNbaPlayersStats: builder.query<
      IStatsTableDataSource[] | null,
      IFetchNbaPlayersStatsParams
    >({
      async queryFn(
        { teamShortName, selectedSeason, seasonType },
        _queryApi,
        _extraOptions,
        fetchWithBQ,
      ) {
        if (teamShortName) {
          const fetchedPlayersStats = await fetchWithBQ(
            `${seasonType}/?team_abbreviation=${teamShortName}&league_id=00&season_id=${selectedSeason}`,
          );

          const playersStatsTyped = fetchedPlayersStats.data as IStatsTableDataSource[];
          const playersIds = playersStatsTyped.map(({ player_id }) => player_id);

          const playersNames: INbaPlayersNamesRender[] = [];
          for (let i = 0; i < playersIds.length; i++) {
            // use await in for loop to prevent function from sending an excessive amount of requests in parallel (max: 10 req/sec)
            // eslint-disable-next-line no-await-in-loop
            const fetchedPlayersNames = await fetchWithBQ(`players/${playersIds[i]}`);
            const playersNamesTyped =
              fetchedPlayersNames.data as INbaPlayersNamesResponse;

            playersNames.push({
              id: playersNamesTyped.id,
              full_name: playersNamesTyped.full_name,
            });
          }

          const result = createTableDataSource(playersStatsTyped, playersNames);
          return { data: result };
        }
        return { data: null };
      },
    }),
  }),
});

export const { useFetchNbaPlayersStatsQuery } = apiNbaStats;
