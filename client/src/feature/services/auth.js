import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/auth/', credentials: 'include' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: 'refresh_token',
                method: 'POST',
            }),
        }),
        getMe: builder.query({
            query: () => 'me',
        }),
        updateProfile: builder.mutation({
            query: (profile) => ({
                url: 'updateprofile',
                method: 'PUT',
                body: profile,
            }),
        }),

        forgotPassword: builder.mutation({
            query: (email) => ({
                url: 'forgotpassword',
                method: 'POST',
                body: { email },
            }),
        }),

        resetPassword: builder.mutation({
            query: (passwords) => ({
                url: `resetpassword/${passwords.resetToken}`,
                method: 'PUT',
                body: { password: passwords.password },
            }),

        }),
        isLoggedIn: builder.query({
            query: () => 'is-logged-in',
            headers: (state) => ({
                "Cache-Control": "no-cache, no-store, must-revalidate",
                Pragma: "no-cache",
                Expires: 0,
            }),
        }),

        logout: builder.query({
            query: () => 'logout',
            
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
    useLogoutQuery,
 } = authApi;

