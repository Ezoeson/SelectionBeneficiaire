import { apiSlice } from '../apiSlice';
const REGION_URL = '/api/region';
export const regionSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRegion: builder.mutation({
      query: (data) => ({
        url: '/api/region/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Region'],
    }),

    getRegion: builder.query({
      query: () => ({
        url: REGION_URL,
      }),
      providesTags: ['Region'],
      keepUnusedDataFor: 5,
    }),
    deleteRegion: builder.mutation({
      query: (id) => ({
        url: REGION_URL + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneRegion: builder.query({
      query: (id) => ({
        url: REGION_URL + '/' + id,
      }),
    }),
    updateRegion: builder.mutation({
      query: ({ data, id }) => ({
        url: REGION_URL + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetRegionQuery,
  useUpdateRegionMutation,
  useCreateRegionMutation,
  useDeleteRegionMutation,
  useGetOneRegionQuery,
} = regionSlice;
