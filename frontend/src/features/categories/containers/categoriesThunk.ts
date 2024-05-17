import {createAsyncThunk} from '@reduxjs/toolkit';
import {Category, CategoryMutation} from '../../../types/types';
import axiosApi from '../../../utils/axiosApi.ts';
import {serverRoute} from '../../../utils/constants.ts';

export const fetchCategories = createAsyncThunk<Category[]>(
  'categories/fetchAll',
  async () => {
    const response = await axiosApi.get(serverRoute.categories);
    return response.data;
  }
);

export const createCategory = createAsyncThunk<void,CategoryMutation>(
 'categories/create',
 async(categoryMutation) => {
  return  await axiosApi.post(serverRoute.categories, categoryMutation);
 }
);

export const deleteCategory = createAsyncThunk<void,string>(
  'categories/delete',
  async(_id) => {
    return await axiosApi.delete(`/categories/${_id}/delete`);
  }
);