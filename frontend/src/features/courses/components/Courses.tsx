import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectCourses} from '../containers/coursesSlice.ts';
import {useEffect} from 'react';
import {fetchAllCourses} from '../containers/coursesThunk.ts';
import { Grid, Typography } from '@mui/material';
import CourseItem from './CourseItem.tsx';
const Courses = () => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [dispatch]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Курсы</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {courses.map(course => (
          <CourseItem
            key={course.id}
            id={course.id}
            title={course.title}
            price={course.price}
            image={course.image}
            category={course.category.name}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default Courses;