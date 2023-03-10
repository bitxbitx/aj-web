import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const resultsApi = createApi({
    reducerPath: 'resultsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/results/', credentials: 'include' }),
    tagTypes: ['Result'],
    endpoints: (builder) => ({
        getResults: builder.query({
            query: () => '',
            providesTags: ['Result'],
        }),
        getResultById: builder.query({
            query: (id) => id,
            providesTags: ['Result'],
        }),
        deleteResult: builder.mutation({
            query: (id) => ({
                url: id,
                method: 'DELETE',
            }),
            invalidatesTags: ['Result'],
        }),
        updateResult: builder.mutation({
            query: (result) => ({
                url: result._id,
                method: 'PUT',
                body: result,
            }),
            invalidatesTags: ['Result'],
        }),
        createResult: builder.mutation({
            query: (result) => ({
                url: '',
                method: 'POST',
                body: result,
            }),
            invalidatesTags: ['Result'],
        }),
        createMultipleResults: builder.mutation({
            query: (results) => ({
                url: 'multiple',
                method: 'POST',
                body: results,
            }),
            invalidatesTags: ['Result'],
        }),
    }),
});

export const {
    useGetResultsQuery,
    useGetResultByIdQuery,
    useDeleteResultMutation,
    useUpdateResultMutation,
    useCreateResultMutation,
    useCreateMultipleResultsMutation
} = resultsApi;

