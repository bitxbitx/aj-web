import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const accountsApi = createApi({
    reducerPath: 'accountsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/accounts/', credentials: 'include' }),
    tagTypes: ['Account'],
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: () => '',
            providesTags: ['Account'],
        }),
        getAccountById: builder.query({
            query: (id) => id,
            providesTags: ['Account'],
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Account'],
        }),
        updateAccount: builder.mutation({
            query: (account) => ({
                url: account._id,
                method: 'PUT',
                body: account,
            }),
            invalidatesTags: ['Account'],
        }),
        createAccount: builder.mutation({
            query: (account) => ({
                url: '',
                method: 'POST',
                body: account,
            }),
            invalidatesTags: ['Account'],
        }),
    }),
});

export const { 
    useGetAccountsQuery, 
    useGetAccountByIdQuery, 
    useDeleteAccountMutation, 
    useUpdateAccountMutation, 
    useCreateAccountMutation 
} = accountsApi;