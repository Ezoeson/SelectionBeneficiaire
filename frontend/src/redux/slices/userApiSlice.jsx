import { apiSlice } from '../apiSlice';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkcode: builder.mutation({
      query: (data) => ({
        url: '/api/enqueteur/checkcode',
        method: 'POST',
        body: data,
      }),
    }),
    createAccount: builder.mutation({
      query: (data) => ({
        url: '/api/enqueteur/compte',
        method: 'POST',
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/api/enqueteur/compte/login',
        method: 'POST',
        body: data,
      }),
    }),
  
    countEnqueteur: builder.query({
      query: () => ({
        url: '/api/enqueteur/count',
      }),
    }),
  }),
});

export const { useCheckcodeMutation, useCreateAccountMutation, useCountEnqueteurQuery,useLoginMutation } = userSlice;
