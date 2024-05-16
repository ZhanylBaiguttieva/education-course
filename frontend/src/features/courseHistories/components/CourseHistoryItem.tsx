
import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import {CourseListened} from '../../../types/types';

interface Props {
  courseListened: CourseListened;
}

const CourseHistoryItem: React.FC<Props> = ({courseListened}) => {


  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardContent>
          <Typography>{courseListened.course.title}</Typography>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CourseHistoryItem;