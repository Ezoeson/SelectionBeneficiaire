import { apiSlice } from '../apiSlice';

const URL_FORMULAIRE = '/api/formulaire';

export const formulaireSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createFormulaire: builder.mutation({
      query: (data) => ({
        url: URL_FORMULAIRE,
        method: 'POST',
        body: data,
      }),
    }),

    getFormulaire: builder.query({
      query: () => ({
        url: URL_FORMULAIRE,
      }),
      providesTags: ['Formulaire'],
      keepUnusedDataFor: 2,
    }),
    updateFormulaire: builder.mutation({
      query: ({ data, id }) => ({
        url: URL_FORMULAIRE + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),
    getOneFormulaire: builder.query({
      query: (id) => ({
        url: URL_FORMULAIRE + '/' + id,
      }),
    }),
    deleteFormulaire: builder.mutation({
      query: (id) => ({
        url: URL_FORMULAIRE + '/' + id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateFormulaireMutation,
  useGetFormulaireQuery,
  useUpdateFormulaireMutation,
  useDeleteFormulaireMutation,
  useGetOneFormulaireQuery,
} = formulaireSlice;
