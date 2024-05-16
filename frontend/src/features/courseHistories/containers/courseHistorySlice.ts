
import { createSlice } from '@reduxjs/toolkit';

import {CourseListened} from '../../../types/types';
import {fetchCourseListened} from './courseHistoryThunk.ts';
import {RootState} from '../../../app/store.ts';

interface CourseListenedState {
  data: CourseListened[];
  fetching: boolean;
}

const initialState: CourseListenedState = {
  data: [],
  fetching: false,
};

export const courseListenedSlice = createSlice({
  name:'courseListened',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCourseListened.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchCourseListened.fulfilled, (state,{payload: data}) => {
      state.fetching = false;
      state.data = data;
    });
    builder.addCase(fetchCourseListened.rejected, (state) => {
      state.fetching = false;
    });
  }
});

export const courseListenedReducer = courseListenedSlice.reducer;
export const selectCourseListened = (state: RootState) => state.courseListened.data;
export const selectFetching  = (state: RootState) => state.courseListened.fetching;