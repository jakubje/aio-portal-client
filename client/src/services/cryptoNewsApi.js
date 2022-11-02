import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bing-news-search1.p.rapidapi.com/news',
    prepareHeaders: (headers) => {
      headers.set('X-BingApis-SDK', process.env.REACT_APP_Bing_SDK);
      headers.set('X-RapidAPI-Key', process.env.REACT_APP_Rapid_API_Key);
      headers.set('X-RapidAPI-Host', process.env.REACT_APP_Bing_Rapid_Host);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({ query: ({ newsCategory, count }) => `/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}` }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
