import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiLatestNews } from '../services/apiLatestNews';
import { apiNba } from '../services/apiNbaService';
import { apiNbaStats } from '../services/apiNbaStats';
import gameSummaryReducer from './reducers/gameSummarySlice';

const rootReducer = combineReducers({
  [apiNba.reducerPath]: apiNba.reducer,
  [apiLatestNews.reducerPath]: apiLatestNews.reducer,
  [apiNbaStats.reducerPath]: apiNbaStats.reducer,
  gameSummaryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiNba.middleware,
      apiLatestNews.middleware,
      apiNbaStats.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
