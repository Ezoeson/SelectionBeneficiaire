import { apiSlice } from '../apiSlice';

const URL_FOKONTANY = '/api/fokontany';

export const fokontanySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFokontany: builder.mutation({
      query: (data) => ({
        url: URL_FOKONTANY,
        method: 'POST',
        body: data,
      }),
    }),
    updateFokontany: builder.mutation({
      query: ({ data, id }) => ({
        url: URL_FOKONTANY + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),

    getFokontany: builder.query({
      query: () => ({
        url: URL_FOKONTANY,
      }),
     
      keepUnusedDataFor: 5,
    }),
    deleteFokontany: builder.mutation({
      query: (id) => ({
        url: URL_FOKONTANY + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneFokontany: builder.query({
      query: (id) => ({
        url: URL_FOKONTANY + '/' + id,
      }),
     
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useCreateFokontanyMutation,
  useDeleteFokontanyMutation,
  useGetFokontanyQuery,
  useGetOneFokontanyQuery,
  useUpdateFokontanyMutation,
} = fokontanySlice;
