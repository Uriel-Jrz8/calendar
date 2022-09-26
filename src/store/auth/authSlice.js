
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        user: {},
        errorMessge: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            errorMessge = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessge = undefined
        },
        onLogout:(state, { payload }) => {
            state.status= 'not-authenticated';
            state.user= {};
            state.errorMessge= payload;
        },
        clearErrorMessage:( state ) => {
            state.errorMessge= undefined;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onLogin, onChecking, onLogout, clearErrorMessage } = authSlice.actions;