import CourseForm from './CourseForm.tsx';
import {appRoutes} from '../../../utils/constants.ts';
import {useAppDispatch} from '../../../app/hooks.ts';
import {useNavigate} from 'react-router-dom';
import {CourseMutation} from '../../../types/types';
import {createCourse} from '../containers/coursesThunk.ts';

const NewCourse = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onFormSubmit = async (courseMutation: CourseMutation) => {
    try {
      await dispatch(createCourse(courseMutation)).unwrap();
      navigate(appRoutes.courses);
    } catch {
      //
    }
  };

  return (
    <>
      <CourseForm onSubmit={onFormSubmit} />
    </>
  );
};

export default NewCourse;