import  {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Region', 'District', 'Commune','Formulaire','CategorieQuestion','Question','Beneficiaire','Personne','Compte','Enqueteur','Reponse'],
  endpoints: (builder) => ({}),
});