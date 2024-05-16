import {createAsyncThunk} from '@reduxjs/toolkit';
import {CourseMutation as Category} from '../../../types/types';
import axiosApi from '../../../utils/axiosApi.ts';
import {serverRoute} from '../../../utils/constants.ts';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get(serverRoute.categories);
    return response.data;
  }
);