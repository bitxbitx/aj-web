import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth";

const initialAuthState = { user: null, isLoggedIn: false };

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        isLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            console.log("login.fulfilled", action.payload.stack)
            state.isLoggedIn = true;
        })
        .addMatcher(authApi.endpoints.logout.matchFulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        })
        .addMatcher(authApi.endpoints.refreshToken.matchFulfilled, (state, action) => {
            state.isLoggedIn = true;
        })
        .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addMatcher(authApi.endpoints.updateProfile.matchFulfilled, (state, action) => {
            state.user = action.payload;
        })
        .addMatcher(authApi.endpoints.checkLogin.matchFulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        })
    }

});

export const authActions = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;

export default authSlice.reducer;
