import { User } from '@/interface/type';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    token: string;
    user: User | null;
    isLogin: boolean;
}

const initialState: AuthState = {
    token: '',
    user: null,
    isLogin: false,
}

export const AuthSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{token: string, user: User}>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isLogin = true;
        },
        logout: (state) => {
            state.token = '';
            state.user = null;
            state.isLogin = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    login,
    logout,
} = AuthSlice.actions

export default AuthSlice.reducer