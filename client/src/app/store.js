import { configureStore, createStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { footballApi } from '../services/footballApi';
import { cryptoLocalApi } from '../services/cryptoApi';
import authSlice from '../slices/authSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  [cryptoApi.reducerPath]: cryptoApi.reducer,
  [cryptoLocalApi.reducerPath]: cryptoLocalApi.reducer,
  [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
  [footballApi.reducerPath]: footballApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
