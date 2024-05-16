import {createAsyncThunk} from '@reduxjs/toolkit';
import {Course, CourseMutation} from '../../../types/types';
import axiosApi from '../../../utils/axiosApi.ts';
import {serverRoute} from '../../../utils/constants.ts';

export const fetchAllCourses = createAsyncThunk<Course[]>(
  'courses/fetchAll',
  async () => {
    const coursesResponse = await axiosApi.get<Course[]>(serverRoute.courses);
    return coursesResponse.data;
  }
);

export const fetchOneCourse = createAsyncThunk<Course, string>(
  'courses/fetchOne',
  async(id) => {
    const courseResponse = await axiosApi.get<Course>(serverRoute.courses  +`/${id}`);
    return courseResponse.data;
  }
);

export const createCourse = createAsyncThunk<null, CourseMutation>(
  'courses/create',
  async (courseMutation) => {
    const formData = new FormData();

    const keys = Object.keys(courseMutation) as (keyof CourseMutation)[];
    keys.forEach(key => {
      const value = courseMutation[key];

      if (value) {
        formData.append(key, value);
      }
    });

    return axiosApi.post(serverRoute.courses, formData);
  }
);

export const deleteCourse = createAsyncThunk<void, string>(
  'courses/delete',
  async (arg) => {
    try {
      const response = await axiosApi.delete(
        `/courses/${arg}/delete`,
      );
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
);
