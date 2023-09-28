import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/v1',
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: `/login_user`,
        method: 'POST',
        body: { email: email, password: password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authAPI;
