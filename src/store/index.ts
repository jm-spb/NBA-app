import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiLatestNews } from '../services/apiLatestNews';
import { apiNba } from '../services/apiNbaService';

const rootReducer = combineReducers({
  [apiNba.reducerPath]: apiNba.reducer,
  [apiLatestNews.reducerPath]: apiLatestNews.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiNba.middleware, apiLatestNews.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
