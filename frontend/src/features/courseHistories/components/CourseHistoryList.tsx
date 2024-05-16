import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {useEffect} from 'react';
import {Grid, Typography, CircularProgress} from '@mui/material';
import {fetchCourseListened} from '../containers/courseHistoryThunk.ts';
import {selectCourseListened, selectFetching} from '../containers/courseHistorySlice.ts';
import CourseHistoryItem from './CourseHistoryItem.tsx';
const CourseHistoryList = () => {
  const dispatch = useAppDispatch();
  const coursesListened = useAppSelector(selectCourseListened);
  const isLoading = useAppSelector(selectFetching );

  useEffect(() => {
    dispatch(fetchCourseListened());
  }, [dispatch]);

  let courseListenedArea: React.ReactNode = <CircularProgress/>;
  if(!isLoading && coursesListened) {
    courseListenedArea = coursesListened.map(courseListened => (
      <CourseHistoryItem
        key={courseListened._id}
        courseListened={courseListened}
      />
    ));
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Мои курсы</Typography>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        {courseListenedArea}
      </Grid>
    </Grid>
  );
};

export default CourseHistoryList;