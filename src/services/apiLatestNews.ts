import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILatestNews } from '../types/apiLatestNews';

export const apiLatestNews = createApi({
  reducerPath: 'apiLatestNews',
  baseQuery: fetchBaseQuery({
    // baseUrl: 'https://nba-news-today.p.rapidapi.com/news/',
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-host', 'nba-news-today.p.rapidapi.com');
      headers.set('x-rapidapi-key', `${process.env.REACT_APP_NBA_API_KEY}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchLatestNews: builder.query<ILatestNews[], string>({
      query: (source) => source,
    }),
  }),
});

export const { useFetchLatestNewsQuery } = apiLatestNews;
