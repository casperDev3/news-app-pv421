import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthState {
    isFirstLaunch: boolean | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    isFirstLaunch: null,
    isAuthenticated: false,
    isLoading: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setInitData: (state, action: PayloadAction<{
            firstLaunch: boolean,
            loggedIn: boolean,
        }>) => {
            state.isFirstLaunch = action.payload.firstLaunch;
            state.isAuthenticated = action.payload.loggedIn;
            state.isLoading = false;
        },
        finishOnboarding: (state) => {
            state.isFirstLaunch = false;
        },
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
        }
    }
})

export const {setInitData, finishOnboarding, logout, login} = authSlice.actions;
export default authSlice.reducer;