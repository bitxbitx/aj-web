import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithAuth from '../common/baseQueryWithAuth';

/**
 * The API instance for handling authentication-related operations.
 */
export const authApi = createApi({
  /**
   * A string that identifies this API instance within the Redux store.
   */
  reducerPath: 'authApi',

  /**
   * The base query function with authentication for making HTTP requests.
   */
  baseQuery: baseQueryWithAuth,

  /**
   * An array of tag names used for cache invalidation.
   */
  tagTypes: ['Auth'],

  /**
   * Endpoints for handling authentication-related operations.
   */
  endpoints: (builder) => ({
    /**
     * Logs in a user using the provided credentials and obtains an access token.
     * @param {Object} credentials - The user's login credentials.
     * @param {string} credentials.username - The user's username.
     * @param {string} credentials.password - The user's password.
     * @returns {Object} An object containing the endpoint URL, HTTP method, and request body for logging in.
     */
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
      // After a successful login, save the tokens in local storage
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
            const { data } = await queryFulfilled;
            console.log(data)
            localStorage.setItem('authToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('role', data.account.role)
        } catch (err) {
            // Handle the error
        }
    },
    }),

    /**
     * Retrieves the user's profile information.
     * @returns {string} The endpoint URL for getting the user's profile.
     */
    getMe: builder.query({
      query: () => '/auth/me',
      providesTags: ['Auth'],
    }),

    /**
     * Updates the user's profile information.
     * @param {Object} profile - The updated profile information.
     * @returns {Object} An object containing the endpoint URL, HTTP method, and request body for updating the profile.
     */
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: '/auth/me',
        method: 'PUT',
        body: profile,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

// Export individual hooks for each endpoint for use in React components
export const {
  useLoginMutation,
  useGetMeQuery,
  useUpdateProfileMutation,
} = authApi;
