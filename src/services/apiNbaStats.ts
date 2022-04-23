import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  INbaPlayersNamesRender,
  INbaPlayersNamesResponse,
  INbaPlayersStatsRespone,
  INbaStatsTeamsRender,
  INbaStatsTeamsResponse,
} from '../types/apiNbaStats';
import { IStatsTableProps } from '../types/stats';

// const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
    fetchNbaStatsTeams: builder.query<INbaStatsTeamsRender[], void>({
      query: () => `teams/`,
      transformResponse: (rawResult: INbaStatsTeamsResponse[]) =>
        rawResult
          .map(({ id, full_name }) => ({ id, full_name }))
          .sort((a, b) => (a.full_name > b.full_name ? 1 : -1)),
    }),
    fetchNbaPlayersStats: builder.query<INbaPlayersStatsRespone[], IStatsTableProps>({
      query: ({ teamId, selectedSeason }) =>
        `season_totals_regular_season/?team_id=${teamId}&league_id=00&season_id=${selectedSeason}`,
    }),
    fetchNbaPlayersNames: builder.query<INbaPlayersNamesRender[], number[] | undefined>({
      async queryFn(playersIds, _queryApi, _extraOptions, fetchWithBQ) {
        const playersNames: INbaPlayersNamesRender[] = [];
        if (playersIds && playersIds.length > 0) {
          for (let i = 0; i < playersIds.length; i++) {
            // use await in for loop to prevent function from sending an excessive amount of requests in parallel (max: 10 req/sec)
            // eslint-disable-next-line no-await-in-loop
            const { data } = await fetchWithBQ(`players/${playersIds[i]}`);
            const fetchedData = data as INbaPlayersNamesResponse;
            playersNames.push({ id: fetchedData.id, full_name: fetchedData.full_name });
          }
        }
        return { data: playersNames };
      },
    }),
  }),
});

export const {
  useFetchNbaStatsTeamsQuery,
  useFetchNbaPlayersStatsQuery,
  useFetchNbaPlayersNamesQuery,
} = apiNbaStats;
