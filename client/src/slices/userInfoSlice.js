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
      console.log('Action payload: ' + action.payload);
      state.portfolioId = action.payload;
    },
  },
});

export const { updatePortfolioId } = userInfoSlice.actions;

export default userInfoSlice.reducer;
