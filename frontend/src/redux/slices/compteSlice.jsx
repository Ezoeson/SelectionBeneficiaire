import { apiSlice } from '../apiSlice';
const URL_COMPTE = '/api/compte';

export const compteSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompte: builder.query({
      query: () => ({
        url: URL_COMPTE,
      }),
      providesTags: ['Compte'],
      keepUnusedDataFor: 5,
    }),
    getCompteEnqueteur: builder.query({
      query: () => ({
        url: URL_COMPTE + '/get',
      }),
      providesTags: ['Compte'],
      keepUnusedDataFor: 5,
    }),

    getCompteByClerk: builder.query({
      query: (clerkId) => ({
        url: URL_COMPTE + '/clerk/' + clerkId,
      }),
      providesTags: ['Compte'],
      keepUnusedDataFor: 5,
    }),
    deleteCompte: builder.mutation({
      query: (id) => ({
        url: URL_COMPTE + '/' + id,
        method: 'DELETE',
      }),
    }),
    updateCompte: builder.mutation({
      query: ({ data, id }) => ({
        url: URL_COMPTE + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),
    updateCompteByclerk: builder.mutation({
      query: ({ data, clerkId }) => ({
        url: URL_COMPTE + '/update/' + clerkId,
        method: 'PUT',
        body: data,
      }),
    }),
    getOneCompte: builder.query({
      query: (id) => ({
        url: URL_COMPTE + '/' + id,
      }),

      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetCompteByClerkQuery,
  useGetCompteQuery,
  useGetCompteEnqueteurQuery,
  useDeleteCompteMutation,
  useGetOneCompteQuery,
  useUpdateCompteMutation,
  useUpdateCompteByclerkMutation
} = compteSlice;
