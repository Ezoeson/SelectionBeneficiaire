import { apiSlice } from '../apiSlice';

const URL_DISTRICT = '/api/district';

export const districtSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDistrict: builder.mutation({
      query: (data) => ({
        url: URL_DISTRICT,
        method: 'POST',
        body: data,
      }),
    }),
    updateDistrict: builder.mutation({
      query: ({data,id}) => ({
        url: URL_DISTRICT + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),

    getDistrict: builder.query({
      query: () => ({
        url: URL_DISTRICT,
      }),
      providesTags: ['District'],
      keepUnusedDataFor: 5,
    }),
    deleteDistrict: builder.mutation({
      query: (id) => ({
        url: URL_DISTRICT + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneDistrict: builder.query({
      query: (id) => ({
        url: URL_DISTRICT + '/' + id,
      }),
      providesTags: ['District'],
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
 useCreateDistrictMutation,useGetDistrictQuery,useUpdateDistrictMutation,useDeleteDistrictMutation,useGetOneDistrictQuery
} = districtSlice;
