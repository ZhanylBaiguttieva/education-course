import {Category} from '../../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from './categoriesThunk.ts';
import {RootState} from '../../../app/store.ts';

interface CategoriesState {
  categories: Category[];
  fetching: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  fetching: false,
};

 const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetching = true;
    }).addCase(fetchCategories.fulfilled, (state, {payload}) => {
      state.fetching = false;
      state.categories = payload;
    }).addCase(fetchCategories.rejected, (state) => {
      state.fetching = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const categoriesState = (state: RootState) => state.categories.categories;
export const selectCategoriesFetching = (state: RootState) => state.categories.fetching;