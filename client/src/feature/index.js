import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { notesApi } from "./services/note";
import { accountsApi } from "./services/accounts";
import { transactionsApi } from "./services/transactions";

const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [notesApi.reducerPath]: notesApi.reducer,
        [accountsApi.reducerPath]: accountsApi.reducer,
        [transactionsApi.reducerPath]: transactionsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        notesApi.middleware,
        accountsApi.middleware,
        transactionsApi.middleware,
    ),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;
