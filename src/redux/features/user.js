import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: '',
        isLoggedIn: false
    },
    reducers: {
        login: (state, action) => {
            const { user, token } = action.payload;
            if (user && token) {
                state.isLoggedIn = true;
                state.user = user;
                state.token = token;
            }

            Cookies.set('token', token);
            Cookies.set('user', JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = '';
            state.isLoggedIn = false;

            Cookies.remove('token');
            Cookies.remove('user');
        }
    }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;