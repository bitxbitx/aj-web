import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const notesApi = createApi({
    reducerPath: 'notesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/notes', credentials: 'include' }),
    tagTypes: ['Note'],
    endpoints: (builder) => ({
        getNotes: builder.query({
            query: () => '',
            providesTags: ['Note'],
        }),
        getNotesById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ['Note'],
        }),
        addNote: builder.mutation({
            query: (note) => ({
                url: '',
                method: 'POST',
                body: note,
            }),
            invalidatesTags: ['Note'],
        }),
        updateNote: builder.mutation({
            query: (note) => ({
                url: `/${note.id}`,
                method: 'PUT',
                body: note,
            }),
            invalidatesTags: ['Note'],
        }),
        deleteNote: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Note'],
        }),
    }),
})

export const {
    useGetNotesQuery,
    useGetNotesByIdQuery,
    useAddNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
} = notesApi

