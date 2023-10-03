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
    getCryptoHistory: builder.query({ query: ({ coinUUID, timePeriod }) => ({ url: `/coin/${coinUUID}/history`, params: { timePeriod } }) }),
  }),
});

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('access_token');
};

export const cryptoLocalApi = createApi({
  reducerPath: 'cryptoLocalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://0.0.0.0:8080/v1',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${getTokenFromLocalStorage()}`);

      return headers;
    },
  }),
  tagTypes: ['Portfolio'],
  endpoints: (builder) => ({
    listCoins: builder.query({ query: (count) => `/list_coins?limit=${count}&offset=0` }),
    getCoinDetails: builder.query({ query: (coinId) => `/coin?coin_id=${coinId}` }),
    listPortfolios: builder.query({
      query: () => `/get_portfolios`,
      providesTags: (result = [], error, arg) => ['Portfolio'],
    }),
    createPortfolio: builder.mutation({ query: (name) => ({ url: '/create_portfolio', method: 'POST', body: { name } }), invalidatesTags: ['Portfolio'] }),
    getPortfolioRollUp: builder.query({ query: (portfolioId) => `/get_rollup?id=${portfolioId}` }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoHistoryQuery } = cryptoApi;
export const { useListCoinsQuery, useGetCoinDetailsQuery, useListPortfoliosQuery, useCreatePortfolioMutation, useGetPortfolioRollUpQuery } = cryptoLocalApi;
