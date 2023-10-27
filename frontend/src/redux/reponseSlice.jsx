import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // reponses: JSON.parse(localStorage.getItem('reponse')) || [],
  reponses: [],
};

const reponseSlice = createSlice({
  name: 'reponse',
  initialState,
  reducers: {
    setReponse: (state, action) => {
      const newReponse = action.payload;

      // Vérifiez s'il y a déjà une réponse similaire dans le state Redux
      const existingReponseIndex = state.reponses.findIndex(
        (response) => response.questionId === newReponse.questionId
      );

      if (existingReponseIndex === -1) {
        // Si aucune réponse similaire n'existe, ajoutez-la
        state.reponses.push(newReponse);
        // localStorage.setItem('reponse', JSON.stringify(state.reponses));
      } else {
        // Si une réponse similaire existe, mettez à jour la réponse existante
        state.reponses[existingReponseIndex] = newReponse;
      }
    },
  },
});

export const { setReponse } = reponseSlice.actions;
export default reponseSlice.reducer;
