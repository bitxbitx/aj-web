import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import authSlice from "./slices/authSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        )
});

export default store;
