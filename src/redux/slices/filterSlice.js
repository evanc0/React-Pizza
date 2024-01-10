import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0,
  currentPage: 1,
  // fix: 0,
  sort: {
    name: 'популярности (по возрастанию)',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      console.log('actionSetCategoryId', action);
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      // console.log(action, 'TEST');
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.page);
      state.categoryId = Number(action.payload.category);
      // state.fix = Number(action.payload.fix);
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
