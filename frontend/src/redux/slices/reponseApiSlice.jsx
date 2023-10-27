import { apiSlice } from '../apiSlice';

const URL_REPONSE = '/api/reponse';

export const reponseSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createReponse: builder.mutation({
      query: (data) => ({
        url: URL_REPONSE,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useCreateReponseMutation } = reponseSlice;
