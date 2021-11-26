import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { nbaApi } from '../services/NbaService';

const rootReducer = combineReducers({
  [nbaApi.reducerPath]: nbaApi.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(nbaApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
