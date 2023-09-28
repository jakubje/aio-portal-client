import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useLoginMutation } from '../services/auth.service';

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const data = await useLoginMutation(email, password);
    return { user: data };
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
  }
});

const authSlice = createSlice();
