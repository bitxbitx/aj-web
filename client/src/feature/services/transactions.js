import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from '../common/baseQueryWithAuth';

/**
 * The API instance for interacting with the transactions resource.
 */
export const transactionsApi = createApi({
  /**
   * A string that identifies this API instance within the Redux store.
   */
  reducerPath: 'transactionsApi',

  /**
   * The base query function with authentication for making HTTP requests.
   */
  baseQuery: baseQueryWithAuth,

  /**
   * An array of tag names used for cache invalidation.
   */
  tagTypes: ['Transaction'],

  /**
   * Endpoints for interacting with the transactions resource.
   */
  endpoints: (builder) => ({
    /**
     * Retrieves a list of all transactions.
     * @returns {string} The endpoint URL for getting all transactions.
     */
    getTransactions: builder.query({
      query: () => '/transactions',
      providesTags: ['Transaction'],
    }),

    /**
     * Retrieves a single transaction by ID.
     * @param {string} id - The ID of the transaction to retrieve.
     * @returns {string} The endpoint URL for getting a transaction by ID.
     */
    getTransactionById: builder.query({
      query: (id) => `/transactions/${id}`,
      providesTags: ['Transaction'],
    }),

    /**
     * Deletes a transaction by ID.
     * @param {string} id - The ID of the transaction to delete.
     * @returns {Object} An object with the endpoint URL and HTTP method for deleting a transaction.
     */
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transactions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Transaction'],
    }),

    /**
     * Updates a transaction by ID and data.
     * @param {Object} payload - The payload containing ID and transaction data to update.
     * @param {string} payload.id - The ID of the transaction to update.
     * @param {Object} payload.transaction - The updated transaction data.
     * @returns {Object} An object with the endpoint URL, HTTP method, and request body for updating a transaction.
     */
    updateTransaction: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/transactions/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Transaction'],
    }),

    /**
     * Creates a new transaction with the provided data.
     * @param {Object} transaction - The transaction data for creating a new transaction.
     * @returns {Object} An object with the endpoint URL, HTTP method, and request body for creating a transaction.
     */
    createTransaction: builder.mutation({
      query: (transaction) => ({
        url: '/transactions',
        method: 'POST',
        body: transaction,
      }),
      invalidatesTags: ['Transaction'],
    }),

    /**
     * Creates an array of transactions with the provided data.
     * @param {Object[]} transactions - The transaction data for creating new transactions.
     * @returns {Object} An object with the endpoint URL, HTTP method, and request body for creating transactions.
     */
    createTransactions: builder.mutation({
      query: (transactions) => ({
        url: '/transactions/bulk',
        method: 'POST',
        body: transactions,
      }),
      invalidatesTags: ['Transaction'],
    }),
  }),
});

// Export individual hooks for each endpoint for use in React components
export const {
  useGetTransactionsQuery,
  useGetTransactionByIdQuery,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation,
  useCreateTransactionMutation,
  useCreateTransactionsMutation,
} = transactionsApi;
