import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const accountsApi = createApi({
    reducerPath: 'accountsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/accounts/', credentials: 'include' }),
    endpoints: (builder) => ({
        getAccounts: builder.query({
            query: () => '',
        }),
        getAccountById: builder.query({
            query: (id) => id,
        }),
        deleteAccount: builder.mutation({
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),
        }),

        updateAccount: builder.mutation({
            query: (account) => ({
                url: account._id,
                method: 'PUT',
                body: account,
            }),
        }),
        createAccount: builder.mutation({
            query: (account) => ({
                url: '',
                method: 'POST',
                body: account,
            }),
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