import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectOneCourse, selectOneCourseFetching} from '../containers/coursesSlice.ts';
import {useCallback, useEffect} from 'react';
import {fetchOneCourse, updateCourse} from '../containers/coursesThunk.ts';
import {CourseMutation} from '../../../types/types';
import {CircularProgress, Grid} from '@mui/material';
import CourseForm from './CourseForm.tsx';

const EditCourse = () => {
  const navigate = useNavigate();
  const {id} = useParams() as {id: string};
  const dispatch = useAppDispatch();
  const course = useAppSelector(selectOneCourse);
  const isFetching = useAppSelector(selectOneCourseFetching);

  const doFetchOne = useCallback(async() => {
    if(!id) {
      return;
    }
    try {
      await dispatch(fetchOneCourse(id)).unwrap();
    } catch(e) {

      navigate('/404');
    }
  },[dispatch, id, navigate]);

  useEffect(() => {
    void doFetchOne();
  }, [doFetchOne]);


  const onFormSubmit = async (courseMutation: CourseMutation) => {
    dispatch(updateCourse({
      courseId: id,
      courseMutation,
    }));
  };


  let form = <CircularProgress />;

  if(!isFetching && course) {
    const mutation = {
      ...course,
      category: course.category._id,
      price: course.price.toString(),
      image: null,
    };

    form = <CourseForm isEdit onSubmit={onFormSubmit} existingImage={course.image} initialCourse={mutation}/>
  }

  return (
    <Grid container direction="column" gap={2}>
      {form}
    </Grid>
  );
};

export default EditCourse;