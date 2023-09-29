import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser } from './authActions';

const access_token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null;

const refresh_token = localStorage.getItem('refresh_token') ? localStorage.getItem('refresh_token') : null;

const initialState = {
  loading: false,
  success: false,
  access_token, // JWT token
  refresh_token,
  user: null, // User data (optional)
  error: null, // Authentication error (if any)
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('access_token'); // delete token from storage
      localStorage.removeItem('refresh_token');
      state.loading = false;
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.error = null;
    },
  },
  extraReducers: {
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state) => {
      state.loading = false;
      state.success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload.user;
      state.access_token = payload.access_token;
      state.refresh_token = payload.refresh_token;
    },
    [loginUser.rejected]: (state, payload) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
