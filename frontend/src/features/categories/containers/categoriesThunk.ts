import {createAsyncThunk} from '@reduxjs/toolkit';
import {Category} from '../../../types/types';
import axiosApi from '../../../utils/axiosApi.ts';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get('/categories');
    return response.data;
  }
);