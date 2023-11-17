import { apiSlice } from '../apiSlice';

const URL_COMMUNE = '/api/commune';

export const communeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCommune: builder.mutation({
      query: (data) => ({
        url: URL_COMMUNE,
        method: 'POST',
        body: data,
      }),
    }),
    updateCommune: builder.mutation({
      query: ({ data, id }) => ({
        url: URL_COMMUNE + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),

    getCommune: builder.query({
      query: () => ({
        url: URL_COMMUNE,
      }),
      providesTags: ['Commune'],
      keepUnusedDataFor: 2,
    }),
    deleteCommune: builder.mutation({
      query: (id) => ({
        url: URL_COMMUNE + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneCommune: builder.query({
      query: (id) => ({
        url: URL_COMMUNE + '/' + id,
      }),
      providesTags: ['Commune'],
      keepUnusedDataFor: 5,
    }),
    getCommuneChart: builder.query({
      query: () => ({
        url: '/api/commune/chart',
      }),
      providesTags: ['Commune'],
      keepUnusedDataFor: 2,
    }),
  }),
});

export const {
  useCreateCommuneMutation,
  useGetCommuneQuery,
  useUpdateCommuneMutation,
  useDeleteCommuneMutation,
  useGetOneCommuneQuery,
  useGetCommuneChartQuery
} = communeSlice;
