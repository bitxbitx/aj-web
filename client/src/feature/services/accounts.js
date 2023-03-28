// Import the necessary functions from the `@reduxjs/toolkit/query` library
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

// Create a new API instance using `createApi`
export const accountsApi = createApi({
    // Set the `reducerPath` option to a string that identifies this API instance
    reducerPath: 'accountsApi',

    // Set the `baseQuery` option to a `fetchBaseQuery` instance with a base URL and credentials
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/accounts/', credentials: 'include' }),

    // Set the `tagTypes` option to an array of tag names that should be used for cache invalidation
    tagTypes: ['Account'],

    // Define a set of endpoints using the `endpoints` option
    endpoints: (builder) => ({
        // Define a query endpoint called `getAccounts` that returns a list of all accounts
        getAccounts: builder.query({
            // Set the `query` option to an empty string since no additional query parameters are needed
            query: () => '',

            // Set the `providesTags` option to an array with the `Account` tag name to invalidate cache when the data changes
            providesTags: ['Account'],
        }),

        // Define a query endpoint called `getAccountById` that returns a single account by ID
        getAccountById: builder.query({
            // Set the `query` option to a function that takes an `id` parameter and returns the ID as a string
            query: (id) => id,

            // Set the `providesTags` option to an array with the `Account` tag name to invalidate cache when the data changes
            providesTags: ['Account'],
        }),

        // Define a mutation endpoint called `deleteAccount` that deletes an account by ID
        deleteAccount: builder.mutation({
            // Set the `query` option to a function that takes an `id` parameter and returns an object with a URL and HTTP method
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),

            // Set the `invalidatesTags` option to an array with the `Account` tag name to invalidate cache after the mutation
            invalidatesTags: ['Account'],
        }),

        // Define a mutation endpoint called `updateAccount` that updates an account by ID and data
        updateAccount: builder.mutation({
            // Set the `query` option to a function that takes an object with an `id` and `account` property and returns an object with a URL, HTTP method, and request body
            query: ({ id, account }) => ({
                url: id,
                method: 'PUT',
                body: account,
            }),

            // Set the `invalidatesTags` option to an array with the `Account` tag name to invalidate cache after the mutation
            invalidatesTags: ['Account'],
        }),

        // Define a mutation endpoint called `createAccount` that creates a new account with the provided data
        createAccount: builder.mutation({
            // Set the `query` option to a function that takes an `account` parameter and returns an object with a URL, HTTP method, and request body
            query: (account) => ({
                url: '',
                method: 'POST',
                body: account,
            }),

            // Set the `invalidatesTags` option to an array with the `Account` tag name to invalidate cache after the mutation
            invalidatesTags: ['Account'],
        }),
    }),
});

// Export individual hooks for each endpoint for use in React components
export const {
    useGetAccountsQuery,
    useGetAccountByIdQuery,
    useDeleteAccountMutation,
    useUpdateAccountMutation,
    useCreateAccountMutation,
} = accountsApi;
