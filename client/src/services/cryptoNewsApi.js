import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', process.env.REACT_APP_Rapid_API_Key);
      headers.set('X-RapidAPI-Host', process.env.REACT_APP_Web_Search_Rapid_Host);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({ newsCategory, count }) => `?q=${newsCategory}&pageNumber=1&pageSize=${count}&autoCorrect=true&fromPublishedDate=null&toPublishedDate=null`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
