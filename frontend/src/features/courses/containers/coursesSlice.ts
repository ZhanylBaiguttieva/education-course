import {Course} from '../../../types/types';
import {createSlice} from '@reduxjs/toolkit';
import {createCourse, deleteCourse, fetchAllCourses, fetchOneCourse} from './coursesThunk.ts';
import {RootState} from '../../../app/store.ts';

interface CourseState {
  courses: Course[];
  course: Course | null;
  isLoading: boolean;
  fetchOneLoading: boolean;
  isCreating: boolean;
  isDeleting: boolean;
}

const initialState: CourseState = {
  courses: [],
  course: null,
  isLoading: false,
  fetchOneLoading: false,
  isCreating: false,
  isDeleting: false,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchAllCourses.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllCourses.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      if (payload) {
        state.courses = payload;
      }
    });
    builder.addCase(fetchAllCourses.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchOneCourse.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneCourse.fulfilled, (state, {payload}) => {
      state.fetchOneLoading = false;
      state.course = payload
    });
    builder.addCase(fetchOneCourse.rejected, (state) => {
      state.fetchOneLoading = false;
    });

    builder.addCase(createCourse.pending, (state) => {
      state.isCreating = true;
    });
    builder.addCase(createCourse.fulfilled, (state) => {
      state.isCreating = false;
    });
    builder.addCase(createCourse.rejected, (state) => {
      state.isCreating = false;
    });

    builder.addCase(deleteCourse.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deleteCourse.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deleteCourse.rejected, (state) => {
      state.isDeleting = false;
    });
  },
});

export const coursesReducer = coursesSlice.reducer;
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectOneCourse = (state: RootState) => state.courses.course;
export const selectCoursesLoading = (state: RootState) => state.courses.isLoading;

export const selectOneCourseFetching = (state: RootState) => state.courses.fetchOneLoading;

export const selectCourseCreating = (state: RootState) =>  state.courses.isCreating;

export const selectDeleting = (state: RootState) => state.courses.isDeleting;