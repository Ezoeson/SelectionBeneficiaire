import { apiSlice } from '../apiSlice';
const URL_ENQUETEUR = '/api/enqueteur';

export const enqueteurSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEnqueteur: builder.mutation({
      query: (data) => ({
        url: URL_ENQUETEUR,
        method: 'POST',
        body: data,
      }),
    }),
    updateEnqueteur: builder.mutation({
      query: ({ data, id }) => ({
        url: URL_ENQUETEUR + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),

    getEnqueteur: builder.query({
      query: ({ pageNumber }) => ({
        url: URL_ENQUETEUR,
        params: {
          pageNumber,
        },
      }),
      providesTags: ['Enqueteur'],
      keepUnusedDataFor: 5,
    }),
    getEnqueteurSelect: builder.query({
      query: () => ({
        url: '/api/enqueteur/get',
      }),
      providesTags: ['Enqueteur'],
      keepUnusedDataFor: 3,
    }),
    uploadUserImage: builder.mutation({
      query: (data) => ({
        url: '/api/upload',
        method: 'POST',
        body: data,
      }),
    }),
    deleteEnqueteur: builder.mutation({
      query: (id) => ({
        url: URL_ENQUETEUR + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneEnqueteur: builder.query({
      query: (id) => ({
        url: URL_ENQUETEUR + '/' + id,
      }),
      providesTags: ['Enqueteur'],
      keepUnusedDataFor: 5,
    }),
    getPersonneNote: builder.query({
      query: (id) => ({
        // url: URL_ENQUETEUR + '/note/' + id,
        url: `${URL_ENQUETEUR}/note/${id}`,
      }),
      providesTags: ['Enqueteur'],
      keepUnusedDataFor: 3,
    }),
    getSerchEnqueteur: builder.query({
      query: (enqueteurSearch) => ({
        // url: URL_ENQUETEUR + '/search/enqueteur/' + enqueteurSearch,
        url: `${URL_ENQUETEUR}/search/enqueteur/${enqueteurSearch}`,
      }),
      providesTags: ['Enqueteur'],
      keepUnusedDataFor: 2,
    }),
  }),
});

export const {
  useCreateEnqueteurMutation,
  useUpdateEnqueteurMutation,
  useGetEnqueteurQuery,
  useUploadUserImageMutation,
  useDeleteEnqueteurMutation,
  useGetOneEnqueteurQuery,
  useGetSerchEnqueteurQuery,
  useGetPersonneNoteQuery,
  useGetEnqueteurSelectQuery,
} = enqueteurSlice;
