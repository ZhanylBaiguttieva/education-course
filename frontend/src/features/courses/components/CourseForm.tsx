import {CourseMutation} from '../../../types/types';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectCourseCreating} from '../containers/coursesSlice.ts';
import {useEffect, useMemo, useState} from 'react';
import { Box, Container, Grid, TextField, Typography, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {categoriesState} from '../../categories/containers/categoriesSlice.ts';
import {fetchCategories} from '../../categories/containers/categoriesThunk.ts';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';

interface Props {
  onSubmit: (mutation: CourseMutation) => void;
  isEdit?: boolean;
  initialCourse?: CourseMutation;
  existingImage?: string | null;
}


const initialState: CourseMutation = {
  category: '',
  title: '',
  description: '',
  price: '',
  image: null,
};
const CourseForm: React.FC<Props> = ({onSubmit,
  isEdit = false, initialCourse = initialState,existingImage}) => {

  const isCreateLoading = useAppSelector(selectCourseCreating);
  const categories = useAppSelector(categoriesState);

  const dispatch = useAppDispatch();
  const [state, setState] = useState<CourseMutation>(initialCourse);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;

    setState((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  const selectedFilename = useMemo(() => {
    if(state.image instanceof File) {
      return state.image.name;
    } else if(state.image === 'delete') {
      return undefined;
    } else if(existingImage) {
      return  existingImage;
    }
  },[state.image, existingImage]);

  const onImageClear = () => {
    setState(prev => ({
      ...prev,
      image:'delete',
    }));
  };


  return (
      <Container component="main">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            {isEdit ? 'Обновить курс' : 'Добавить курс'}
          </Typography>
          <Box
            component="form"
            onSubmit={submitFormHandler}
            sx={{mt: 3, width: '100%'}}
          >
            <Grid container spacing={2} alignItems="start">
              <Grid
                container
                item
                xs={12}
                sm={6}
                direction="row"
                spacing={2}
                sx={{margin: 'auto'}}
              >
                <Grid item xs>
                  <TextField
                    fullWidth
                    select
                    id="category" label="Категория"
                    value={categories.length > 0 ? state.category : ''}
                    onChange={inputChangeHandler}
                    name="category"
                    required
                  >
                    <MenuItem value="" disabled>Please select a category</MenuItem>
                    {categories.length > 0 && (
                      categories.map(category => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.name}
                        </MenuItem>
                      ))
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    required
                    name="title"
                    label="Название"
                    type="text"
                    value={state.title}
                    autoComplete="new-title"
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="description"
                    label="Описание"
                    type="text"
                    value={state.description}
                    autoComplete="new-description"
                    onChange={inputChangeHandler}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="price" label="Цена"
                    value={state.price}
                    onChange={inputChangeHandler}
                    name="price"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FileInput
                    label="Image"
                    name="image"
                    onChange={fileInputChangeHandler}
                    filename={selectedFilename}
                    onClear={onImageClear}
                  />
                </Grid>
                <LoadingButton
                  type={'submit'}
                  variant="contained"
                  loading={isCreateLoading}
                  disabled={isCreateLoading}
                  sx={{marginTop: 1, marginLeft: 2, width: 690}}
                >
                  {isEdit ? 'Обновить' : 'Добавить'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
};

export default CourseForm;