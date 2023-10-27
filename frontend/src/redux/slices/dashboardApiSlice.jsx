import { apiSlice } from '../apiSlice';
const URL_DASHBOARD = '/api/dashboard';

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDasboard: builder.query({
      query: () => ({
        url: '/api/dashboard/countBef',
        keepUnusedDataFor: 30,
      }),

      keepUnusedDataFor: 5,
    }),
  }),
  overrideExisting: false,
});

export const { useGetDasboardQuery } = dashboardApiSlice;
