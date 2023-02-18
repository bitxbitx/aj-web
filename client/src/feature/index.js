import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import authSlice from "./slices/authSlice";
import { platformApi } from "./services/platform";
import { notesApi } from "./services/note";
import { accountsApi } from "./services/accounts";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
        [platformApi.reducerPath]: platformApi.reducer,
        [notesApi.reducerPath]: notesApi.reducer,
        [accountsApi.reducerPath]: accountsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        platformApi.middleware,
        notesApi.middleware,
        accountsApi.middleware
    ),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
