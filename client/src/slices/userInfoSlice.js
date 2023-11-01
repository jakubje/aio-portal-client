import { createSlice } from '@reduxjs/toolkit';
import { fetchRefreshToken, loginUser, registerUser } from './authActions';

const initialState = {
  portfolioId: '',
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updatePortfolioId: (state, action) => {
      state.portfolioId = action.payload;
    },
  },
});

export const { updatePortfolioId } = userInfoSlice.actions;

export default userInfoSlice.reducer;
