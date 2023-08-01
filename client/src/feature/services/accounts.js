import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from '../common/baseQueryWithAuth';

/**
 * The API instance for interacting with the accounts resource.
 */
export const accountsApi = createApi({
    /**
     * A string that identifies this API instance within the Redux store.
     */
    reducerPath: 'accountsApi',

    /**
     * The base query function with authentication for making HTTP requests.
     */
    baseQuery: baseQueryWithAuth,

    /**
     * An array of tag names used for cache invalidation.
     */
    tagTypes: ['Account'],

    /**
     * Endpoints for interacting with the accounts resource.
     */
    endpoints: (builder) => ({
        /**
         * Retrieves a list of all accounts.
         * @returns {string} The endpoint URL for getting all accounts.
         */
        getAccounts: builder.query({
            query: () => '/accounts',
            providesTags: ['Account'],
        }),

        /**
         * Retrieves a single account by ID.
         * @param {string} id - The ID of the account to retrieve.
         * @returns {string} The endpoint URL for getting an account by ID.
         */
        getAccountById: builder.query({
            query: (id) => `/accounts/${id}`,
            providesTags: ['Account'],
        }),

        /**
         * Deletes an account by ID.
         * @param {string} id - The ID of the account to delete.
         * @returns {Object} An object with the endpoint URL and HTTP method for deleting an account.
         */
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: `/accounts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Account'],
        }),

        /**
         * Updates an account by ID and data.
         * @param {Object} payload - The payload containing ID and account data to update.
         * @param {string} payload.id - The ID of the account to update.
         * @param {Object} payload.account - The updated account data.
         * @returns {Object} An object with the endpoint URL, HTTP method, and request body for updating an account.
         */
        updateAccount: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/accounts/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Account'],
        }),

        /**
         * Creates a new account with the provided data.
         * @param {Object} account - The account data for creating a new account.
         * @returns {Object} An object with the endpoint URL, HTTP method, and request body for creating an account.
         */
        createAccount: builder.mutation({
            query: (account) => ({
                url: '/accounts',
                method: 'POST',
                body: account,
            }),
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
