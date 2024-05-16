
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import {apiURL, appRoutes} from '../../../utils/constants.ts';
import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  styled
} from '@mui/material';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../../users/usersSlice.ts';
import {deleteCourse, fetchAllCourses} from '../containers/coursesThunk.ts';
import {LoadingButton} from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import {selectDeleting} from '../containers/coursesSlice.ts';
import {addCourseToHistory} from '../../courseHistories/containers/courseHistoryThunk.ts';


const ImageCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%',
});
interface Props {
  _id: string;
  title: string;
  price: number;
  image: string | null;
  category: string;
}

const CourseItem: React.FC<Props> = ({title, price, _id, image, category}) => {
  const user = useAppSelector(selectUser);
  const isDelete = useAppSelector(selectDeleting);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  const deleteHandler = async () => {
    await dispatch(deleteCourse(_id));
    await dispatch(fetchAllCourses());
    navigate(appRoutes.courses);
  };

  const addCourse = async() => {
    await dispatch(addCourseToHistory(_id));
  };


  return (
    <Grid item sm md={6} lg={4}>
      <Card sx={{height: '100%'}}>
        <CardHeader title={title}/>
        <ImageCardMedia image={cardImage} title={title}/>
        <CardContent>
          <p>
            <strong>Категория:</strong> {category}
          </p>
          <strong>{price} $ (полный курс) </strong>
        </CardContent>
        <CardActions>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Button
                variant="contained"
                onClick={addCourse} >
                Выбрать
              </Button>
            </Grid>
            <Grid item>
              {user?.role === 'admin' && (
                <Button
                  variant="contained"
                  component={Link} to={appRoutes.adminCoursesEdit.replace(':id',_id)}
                >
                  Изменить</Button>
              )}
            </Grid>
            <Grid item>
              {user?.role === 'admin' && (
                <LoadingButton
                  disabled={isDelete}
                  loading={isDelete}
                  onClick={deleteHandler}
                  sx={{ minWidth: '29px', padding: '3px', borderRadius: '50%' }}
                  color="error"
                >
                  <CancelIcon />
                </LoadingButton>
              )}
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CourseItem;