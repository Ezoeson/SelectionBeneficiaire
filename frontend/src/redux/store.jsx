import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import questionSlice from './questionSlice';
import categorieSlice from './categorieSlice';
import reponseSlice from './reponseSlice';
import filtrafeCommuneSlice from './filitrageCommuneSlice';

import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    question: questionSlice,
    categorie: categorieSlice,
    reponse: reponseSlice,
    filtrageCommune: filtrafeCommuneSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
  devTools: false,
});
