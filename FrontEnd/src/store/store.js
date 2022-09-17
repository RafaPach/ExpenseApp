import { configureStore } from '@reduxjs/toolkit';
import expenseSlice from './reducer.js';
import { apiSlice } from './apifetch.js';
export const store = configureStore({
  reducer: { expense: expenseSlice, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
