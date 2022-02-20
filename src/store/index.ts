import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiBasketball } from '../services/apiBasketballService';
import { apiNba } from '../services/apiNbaService';

const rootReducer = combineReducers({
  [apiNba.reducerPath]: apiNba.reducer,
  [apiBasketball.reducerPath]: apiBasketball.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiNba.middleware, apiBasketball.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
