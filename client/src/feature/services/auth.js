import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/auth/', credentials: 'include' }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: 'refresh_token',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),
        getMe: builder.query({
            query: () => 'me',
            providesTags: ['Auth'],
        }),
        updateProfile: builder.mutation({
            query: (profile) => ({
                url: 'updateprofile',
                method: 'PUT',
                body: profile,
            }),
            invalidatesTags: ['Auth'],
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: 'forgotpassword',
                method: 'POST',
                body: { email },
            }),
            invalidatesTags: ['Auth'],
        }),

        resetPassword: builder.mutation({
            query: (passwords) => ({
                url: `resetpassword/${passwords.resetToken}`,
                method: 'PUT',
                body: { password: passwords.password },
            }),
            invalidatesTags: ['Auth'],
        }),
        isLoggedIn: builder.query({
            query: () => 'is-logged-in',
            headers: (state) => ({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: 0,
            }),
            providesTags: ['Auth'],
        }),

        logout: builder.mutation({
            query: () => ({
                url: 'logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],    
        }),
    }),
});

export const { 
    useLoginMutation,
    useRefreshTokenMutation,
    useGetMeQuery,
    useUpdateProfileMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useIsLoggedInQuery,    
    useLogoutMutation,
 } = authApi;

