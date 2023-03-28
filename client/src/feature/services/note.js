/**
 * notesApi is a Redux Toolkit API slice that encapsulates API logic for CRUD operations for notes.
 *
 * It is built using the `createApi` function from the `@reduxjs/toolkit/query/react` and `@reduxjs/toolkit/query` packages.
 *
 * The API provides the following endpoints:
 * - getNotes: Retrieves a list of notes
 * - getNoteById: Retrieves a note by its ID
 * - addNote: Creates a new note
 * - updateNote: Updates an existing note
 * - deleteNote: Deletes a note
 *
 * @see https://redux-toolkit.js.org/rtk-query/usage/examples#basic-example
 */
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const notesApi = createApi({
  // A name used to generate action types and base names for actions and selectors
  reducerPath: 'notesApi',
  // The base query for all endpoints. Sets the baseUrl and credentials.
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/notes', credentials: 'include' }),
  // Defines a custom tag type to invalidate tags with the same type
  tagTypes: ['Note'],
  // Defines endpoints for each operation with their respective methods and query parameters.
  endpoints: (builder) => ({
    // Queries all notes.
    getNotes: builder.query({
      query: () => '',
      providesTags: ['Note'],
    }),
    // Queries a single note by ID.
    getNotesById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Note'],
    }),
    // Creates a new note.
    addNote: builder.mutation({
      query: (note) => ({
        url: '',
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
    // Updates an existing note.
    updateNote: builder.mutation({
      query: (note) => ({
        url: `/${note.id}`,
        method: 'PUT',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),
    // Deletes a note by ID.
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
  }),
});

// Extract the generated hooks for each endpoint.
export const {
  useGetNotesQuery,
  useGetNotesByIdQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
