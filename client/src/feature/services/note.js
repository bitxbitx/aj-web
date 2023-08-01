import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from '../common/baseQueryWithAuth';

/**
 * The API instance for handling CRUD operations for notes.
 */
export const notesApi = createApi({
  /**
   * A string that identifies this API instance within the Redux store.
   */
  reducerPath: 'notesApi',

  /**
   * The base query function with authentication for making HTTP requests.
   */
  baseQuery: baseQueryWithAuth,

  /**
   * An array of tag names used for cache invalidation.
   */
  tagTypes: ['Note'],

  /**
   * Endpoints for handling CRUD operations for notes.
   */
  endpoints: (builder) => ({
    /**
     * Retrieves a list of notes.
     * @returns {string} The endpoint URL for getting the list of notes.
     */
    getNotes: builder.query({
      query: () => '/notes',
      providesTags: ['Note'],
    }),

    /**
     * Retrieves a single note by its ID.
     * @param {string} id - The ID of the note to retrieve.
     * @returns {string} The endpoint URL for getting a single note by its ID.
     */
    getNotesById: builder.query({
      query: (id) => `/notes/${id}`,
      providesTags: ['Note'],
    }),

    /**
     * Creates a new note.
     * @param {Object} note - The data for the new note.
     * @returns {Object} An object containing the endpoint URL, HTTP method, and request body for creating a new note.
     */
    addNote: builder.mutation({
      query: (note) => ({
        url: '/notes',
        method: 'POST',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),

    /**
     * Updates an existing note.
     * @param {Object} note - The data for the note to update, including the ID.
     * @returns {Object} An object containing the endpoint URL, HTTP method, and request body for updating an existing note.
     */
    updateNote: builder.mutation({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: 'PUT',
        body: note,
      }),
      invalidatesTags: ['Note'],
    }),

    /**
     * Deletes a note by its ID.
     * @param {string} id - The ID of the note to delete.
     * @returns {Object} An object containing the endpoint URL and HTTP method for deleting a note by its ID.
     */
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
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
