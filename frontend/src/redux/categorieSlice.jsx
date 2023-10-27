import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  search_value: '%20',
};

const searchSlice = createSlice({
  name: 'categorie',
  initialState,
  reducers: {
    setSearchValue: (state, action) => {
      state.search_value = action.payload;
    },
  },
  clearSearch: (state, action) => {
    state.enqueteurSearch = '';
  },
});

export const { setSearchValue, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
