import { apiSlice } from '../apiSlice';

const URL_QUESTION = '/api/question';

export const questionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createQuestion: builder.mutation({
      query: (data) => ({
        url: URL_QUESTION,
        method: 'POST',
        body: data,
      }),
    }),

    getQuestion: builder.query({
      query: (search_value) => ({
        // url: `${URL_QUESTION}?search=${search_value}`
        url: `/api/question/search/${search_value}`,
      }),
      providesTags: ['Question'],
      keepUnusedDataFor: 5,
    }),
    updateQuestion: builder.mutation({
      query: ({ data, id }) => ({
        url: URL_QUESTION + '/' + id,
        method: 'PUT',
        body: data,
      }),
    }),
    getOneQuestion: builder.query({
      query: (id) => ({
        url: URL_QUESTION + '/' + id,
      }),
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: URL_QUESTION + '/' + id,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateQuestionMutation,
  useGetQuestionQuery,
  useDeleteQuestionMutation,
  useGetOneQuestionQuery,
  useUpdateQuestionMutation,
} = questionApiSlice;
