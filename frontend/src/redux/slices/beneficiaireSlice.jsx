import { apiSlice } from '../apiSlice';

const URL_BENEFICIAIRE = '/api/beneficiaire';

export const beneficiaireSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBeneficiaire: builder.mutation({
      query: (enqueteurId) => ({
        url: URL_BENEFICIAIRE,
        method: 'POST',
        body: enqueteurId,
      }),
    }),

    getBeneficiaire: builder.query({
      query: () => ({
        url: URL_BENEFICIAIRE,
      }),
      providesTags: ['Beneficiaire'],
      keepUnusedDataFor: 5,
    }),

    countBeneficiaire: builder.query({
      query: () => ({
        url: '/api/beneficiaire/count',
      }),
      providesTags: ['Beneficiaire'],
      keepUnusedDataFor: 5,
    }),
    updateBeneficiaire: builder.mutation({
      query: ({ data, id }) => ({
        url: URL_BENEFICIAIRE + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),
    getOneBeneficiaire: builder.query({
      query: (id) => ({
        url: URL_BENEFICIAIRE + '/' + id,
      }),
    }),
    deleteBeneficiaire: builder.mutation({
      query: (id) => ({
        url: URL_BENEFICIAIRE + '/' + id,
        method: 'DELETE',
      }),
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: URL_BENEFICIAIRE + '/notes/' + id,
        method: 'DELETE',
      }),
    }),
    getNoteBeneficiaire: builder.query({
      query: () => ({
        url: '/api/beneficiaire/note',
      }),
    }),
    getNoteByPersonne: builder.query({
      query: () => ({
        url: '/api/beneficiaire/personne/note',
      }),
    }),
    getBeneficiaireNombrePersonne: builder.query({
      query: () => ({
        url: '/api/beneficiaire/personne',
      }),
    }),
  }),
});

export const {
  useCreateBeneficiaireMutation,
  useGetBeneficiaireQuery,
  useCountBeneficiaireQuery,
  useUpdateBeneficiaireMutation,
  useDeleteBeneficiaireMutation,
  useGetOneBeneficiaireQuery,
  useGetNoteBeneficiaireQuery,
  useDeleteNoteMutation,
  useGetNoteByPersonneQuery,
  useGetBeneficiaireNombrePersonneQuery,
} = beneficiaireSlice;
