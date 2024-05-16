import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectCourses} from '../containers/coursesSlice.ts';
import {useEffect} from 'react';
import {fetchAllCourses} from '../containers/coursesThunk.ts';
import {Button, Grid, Typography} from '@mui/material';
import CourseItem from './CourseItem.tsx';
import {selectUser} from '../../users/usersSlice.ts';
import {Link} from 'react-router-dom';
import {appRoutes} from '../../../utils/constants.ts';
const Courses = () => {
  const user = useAppSelector(selectUser);
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
        {user && user.role === 'admin' && (
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link} to={appRoutes.adminCoursesAdd}>
              Добавить курс
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container spacing={2}>
        {courses.map(course => (
          <CourseItem
            key={course._id}
            _id={course._id}
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