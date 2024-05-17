import {Category} from '../../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {createCategory, deleteCategory, fetchCategories} from './categoriesThunk.ts';
import {RootState} from '../../../app/store.ts';

interface CategoriesState {
  categories: Category[];
  fetching: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  fetching: false,
  isCreating: false,
  isDeleting: false,
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

    builder.addCase(createCategory.pending, (state) => {
      state.isCreating = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.isCreating = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.isCreating = false;
    });

    builder.addCase(deleteCategory.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.isDeleting = false;
    });
  }
});

export const categoriesReducer = categoriesSlice.reducer;

export const categoriesState = (state: RootState) => state.categories.categories;
export const selectCategoriesFetching = (state: RootState) => state.categories.fetching;

export const selectCategoryCreating = (state: RootState) => state.categories.isCreating;

export const selectCategoryDeleting = (state: RootState) => state.categories.isDeleting;