import { apiSlice } from '../apiSlice';

const URL_PERSONNE = '/api/personne';

export const personneSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPersonne: builder.mutation({
      query: (data) => ({
        url: URL_PERSONNE,
        method: 'POST',
        body: data,
      }),
    }),

    getPersonne: builder.query({
      query: () => ({
        url: URL_PERSONNE,
      }),
      providesTags: ['Personne'],
      keepUnusedDataFor: 2,
    }),
    getOnePersonne: builder.query({
      query: (id) => ({
        url: URL_PERSONNE + '/' + id,
      }),
      providesTags: ['Personne'],
      keepUnusedDataFor: 2,
    }),
    updatePersonne: builder.mutation({
      query: ({ id, data }) => ({
        url: URL_PERSONNE + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),
    deletePersonne: builder.mutation({
      query: (id) => ({
        url: URL_PERSONNE + '/' + id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreatePersonneMutation,
  useGetPersonneQuery,
  useGetOnePersonneQuery,
  useUpdatePersonneMutation,
  useDeletePersonneMutation,
} = personneSlice;
