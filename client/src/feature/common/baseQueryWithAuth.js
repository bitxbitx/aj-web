import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshResult = await baseQuery('/auth/refresh-token', api, { body: { refreshToken } });
        if (refreshResult.data) {
            localStorage.setItem('authToken', refreshResult.data.accessToken);
            localStorage.setItem('refreshToken', refreshResult.data.refreshToken);
            return baseQuery(args, api, extraOptions);
        } else {
            // Redirect to login page
            window.location.href = '/';
        }
    }
    return result;
};

export default baseQueryWithAuth;
