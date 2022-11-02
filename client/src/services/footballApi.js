import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const footballApi = createApi({
  reducerPath: 'footballApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://football98.p.rapidapi.com/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', process.env.REACT_APP_Rapid_API_Key);
      headers.set('X-RapidAPI-Host', process.env.REACT_APP_Football_API_Host);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCompetitons: builder.query({ query: () => 'https://football98.p.rapidapi.com/competitions' }),
    getFixtures: builder.query({ query: (league) => ({ url: `/${league}/fixtures` }) }),
    getResults: builder.query({ query: (league) => ({ url: `/${league}/results` }) }),
  }),
});

export const { useGetCompetitonsQuery, useGetFixturesQuery, useGetResultsQuery } = footballApi;
