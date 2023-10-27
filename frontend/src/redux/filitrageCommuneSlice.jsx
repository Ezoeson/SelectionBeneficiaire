import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  idCommune: '',
};

const filtrafeCommuneSlice = createSlice({
  name: 'filtrageCommune',
  initialState,
  reducers: {
    setIdValue: (state, action) => {
      state.idCommune = action.payload;
    },
  },
  clearId: (state, action) => {
    state.idCommune = '';
  },
});

export const { setIdValue, clearId } = filtrafeCommuneSlice.actions;
export default filtrafeCommuneSlice.reducer;
