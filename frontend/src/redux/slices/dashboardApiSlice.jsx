import { apiSlice } from '../apiSlice';
const URL_DASHBOARD = '/api/dashboard';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDasboard: builder.query({
      query: () => ({
        url: '/api/dashboard/countBef',
      }),

      keepUnusedDataFor: 2,
    }),
    getUserDasboard: builder.query({
      query: (id) => ({
        url: `/api/dashboard/user/${id}`,
      }),

      keepUnusedDataFor: 2,
    }),
    getDasboardDate: builder.query({
      query: () => ({
        url: '/api/dashboard/date',
      }),

      keepUnusedDataFor: 2,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDasboardQuery,
  useGetDasboardDateQuery,
  useGetUserDasboardQuery,
} = dashboardApiSlice;
