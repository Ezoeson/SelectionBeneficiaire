import { apiSlice } from '../apiSlice';

const URL_CATEGORIE = '/api/categorie';

export const categorieSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategorie: builder.mutation({
      query: (data) => ({
        url: URL_CATEGORIE,
        method: 'POST',
        body: data,
      }),
    }),

    getCategorie: builder.query({
      query: () => ({
        url: URL_CATEGORIE,
      }),
      providesTags: ['Categorie'],
      keepUnusedDataFor: 2,
    }),
    updateCategorie: builder.mutation({
      query: ({ data, id }) => ({
        url: URL_CATEGORIE + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCategorie: builder.mutation({
      query: (id) => ({
        url: URL_CATEGORIE + '/' + id,
        method: 'DELETE',
      }),
    }),
    getOneCategorie: builder.query({
      query: (id) => ({
        url: URL_CATEGORIE + '/' + id,
      }),
    }),
    getNombreQuestion: builder.query({
      query: () => ({
        url: URL_CATEGORIE + '/nombre',
      }),
    }),
    getSelectCategories: builder.query({
      query: (id) => ({
        url: `{URL_CATEGORIE}/${id}/select`,
      }),
    }),
  }),
});

export const {
  useCreateCategorieMutation,
  useGetCategorieQuery,
  useUpdateCategorieMutation,
  useDeleteCategorieMutation,
  useGetOneCategorieQuery,
  useGetSelectCategoriesQuery,
  useGetNombreQuestionQuery
} = categorieSlice;
