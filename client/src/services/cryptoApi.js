import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://coinranking1.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', process.env.REACT_APP_Rapid_API_Key);
      headers.set('X-RapidAPI-Host', process.env.REACT_APP_Rapid_API_Host);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptos: builder.query({ query: (count) => `/coins?limit=${count}` }),
    getCryptoDetails: builder.query({ query: (coinId) => `/coin/${coinId}` }),
    getCryptoHistory: builder.query({ query: ({ coinId, timePeriod }) => ({ url: `/coin/${coinId}/history`, params: { timePeriod } }) }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
