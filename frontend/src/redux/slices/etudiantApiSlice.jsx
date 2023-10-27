import { apiSlice } from "../apiSlice";

export const etudiantSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEtudiants: builder.query({
      query: () => ({
        url: "/api/students",
      }),
      keepUnusedDataFor: 5,
    }),
    deleteEtudiant: builder.mutation({
      query: (id) => ({
        url: "/api/students/" + id,
        method: "DELETE",
      }),
    }),
    getClasses: builder.query({
      query: () => ({
        url: "/api/classes",
      }),
      keepUnusedDataFor: 5,
    }),
    createEtudiant: builder.mutation({
      query: (data) => ({
        url: "/api/students",
        method: "POST",
        body: data,
      }),
    }),

    updateEtudiant: builder.mutation({
      query: ({ data, id }) => ({
        url: "/api/students/" + id,
        method: "PUT",
        body: data,
      }),
    }),
    getStudentById: builder.query({
      query: (id) => ({
        url: "/api/students/" + id,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetEtudiantsQuery,
  useDeleteEtudiantMutation,
  useGetClassesQuery,
  useCreateEtudiantMutation,
  useUpdateEtudiantMutation,
  useGetStudentByIdQuery
} = etudiantSlice;
