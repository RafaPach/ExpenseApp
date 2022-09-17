// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query uses a "cache tag" system to automate re-fetching for query endpoints that have data affected by mutation endpoints. This enables designing your API such that firing a specific mutation will cause a certain query endpoint to consider its cached data invalid, and re-fetch the data if there is an active subscription.

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  //   reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      // get resquest by default and the data will be store inside the getCategories function
      query: () => `/`,
      providesTags: ['categories'],
    }),
    // get labels
    getLabels: builder.query({
      query: () => `/labels`,
      providesTags: ['transactions'],
    }),
    //  POST new Transactions, delete post and patch use mutation
    postTransaction: builder.mutation({
      query: (body) => ({
        url: `/transactions`,
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['transactions'],
    }),
    // deleteTransaction
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
        body: id,
      }),
      invalidatesTags: ['transactions'],
    }),

    // get transactions
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export default apiSlice;
