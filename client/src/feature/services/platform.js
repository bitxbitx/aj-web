import { createApi }   from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const platformApi = createApi({
    reducerPath: 'platformApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/platforms', credentials: 'include' }),
    endpoints: (builder) => ({
        getPlatforms: builder.query({
            query: () => '',
        }),
        addPlatform: builder.mutation({
            query: (note) => ({
                url: '',
                method: 'POST',
                body: note,
            }),
        }),
        updatePlatform: builder.mutation({
            query: (note) => ({
                url: `/${note.id}`,
                method: 'PUT',
                body: note,
            }),
        }),
        deletePlatform: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetPlatformsQuery,
    useAddPlatformMutation,
    useUpdatePlatformMutation,
    useDeletePlatformMutation
} = platformApi
