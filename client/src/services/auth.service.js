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
    register: builder.mutation({
      query: ({ email, name, last_name, password }) => ({
        url: `/create_user`,
        method: 'POST',
        body: { email: email, name: name, last_name: last_name, password: password },
      }),
    }),
    refreshToken: builder.mutation({
      query: ({ refresh_token }) => ({
        url: `/refresh_token`,
        method: 'POST',
        body: { refresh_token: refresh_token },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useRefreshTokenMutation } = authAPI;
