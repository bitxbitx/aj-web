import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/notes', credentials: 'include' }),
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => '',
        }),
        addNote: builder.mutation({
            query: (note) => ({
                url: '',
                method: 'POST',
                body: note,
            }),
        }),
        updateNote: builder.mutation({
            query: (note) => ({
                url: `/${note.id}`,
                method: 'PUT',
                body: note,
            }),
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetNotesQuery,
    useAddNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApi
