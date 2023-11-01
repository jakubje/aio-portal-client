import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { footballApi } from '../services/footballApi';
import { cryptoLocalApi } from '../services/cryptoApi';
import authSlice from '../slices/authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import refreshMiddleware from './refreshMiddleware';
import userInfoSlice from '../slices/userInfoSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  userInfo: userInfoSlice,
  auth: authSlice,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  [cryptoLocalApi.reducerPath]: cryptoLocalApi.reducer,
  [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  [footballApi.reducerPath]: footballApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware).concat(cryptoLocalApi.middleware).concat(cryptoNewsApi.middleware).concat(footballApi.middleware),
  // .concat(refreshMiddleware),
});

export const persistor = persistStore(store);
