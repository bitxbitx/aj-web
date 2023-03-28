import { createApi }   from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const platformApi = createApi({
    reducerPath: 'platformApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/platforms', credentials: 'include' }),
    tagTypes: ['Platform'],
    endpoints: (builder) => ({
        getPlatforms: builder.query({
            query: () => '',
            providesTags: ['Platform'],
        }),
        addPlatform: builder.mutation({
            query: (platform) => ({
                url: '',
                method: 'POST',
                body: platform,
            }),
            invalidatesTags: ['Platform'],
        }),
        updatePlatform: builder.mutation({
            query: ({platform, id}) => ({
                url: `/${id}`,
                method: 'PUT',
                body: platform,
            }),
            invalidatesTags: ['Platform'],
        }),
        deletePlatform: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Platform'],
        }),
        getPlatformById: builder.query({
            query: (id) => `/${id}`,
        }),
    }),
})

export const {
    useGetPlatformsQuery,
    useAddPlatformMutation,
    useUpdatePlatformMutation,
    useDeletePlatformMutation,
    useGetPlatformByIdQuery,
} = platformApi
