import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { footballApi } from '../services/footballApi';
import { cryptoLocalApi } from '../services/cryptoApi';

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoLocalApi.reducerPath]: cryptoLocalApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [footballApi.reducerPath]: footballApi.reducer,
  },
});
