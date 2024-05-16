import {createAsyncThunk} from '@reduxjs/toolkit';
import {RootState} from '../../../app/store.ts';
import axiosApi from '../../../utils/axiosApi.ts';
import {CourseListened} from '../../../types/types';

export const addCourseToHistory = createAsyncThunk<void, string, {state: RootState}>(
  'courseListened/create',
  async(courseId, {getState}) => {
    const token = getState().users.user?.token;
    const courseBody = {
      _id: courseId,
    };
    await axiosApi.post('/course_history', courseBody, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
  }
);

export const fetchCourseListened = createAsyncThunk<CourseListened[],void,{state: RootState}>(
  'courseListened/fetchAll',
  async (_, {getState}) => {
    const token =  getState().users.user?.token;

    if(token) {
      const response = await axiosApi.get('/course_history', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      return response.data;
    } else {
      return [];
    }
  }
);