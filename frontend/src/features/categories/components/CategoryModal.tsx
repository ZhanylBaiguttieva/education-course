import React from 'react';
import {CategoryMutation} from '../../../types/types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {selectCategoryCreating} from '../containers/categoriesSlice.ts';
import {createCategory, fetchCategories} from '../containers/categoriesThunk.ts';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
interface Props {
  open: boolean;
  onClose: () => void;
  initialCategory?: CategoryMutation;
}

const initialState = {
  name: '',
};
const CategoryModal: React.FC<Props> = ({open, onClose}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectCategoryCreating);
  const [state, setState] = useState<CategoryMutation>(initialState);


  useEffect(() => {
    if (!open) {
      setState(initialState);
    }
  }, [open]);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleClose = () => {
    onClose();
  };

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    await dispatch(createCategory(state)).unwrap();
    handleClose();
    await dispatch(fetchCategories());
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle>
        <Typography>
           Добавить категорию
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          mt: '20px',
        }}
      >
        <form autoComplete="off" onSubmit={onFormSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                required
                fullWidth
                id="name"
                label="Введите название категории"
                name="name"
                autoComplete="new-name"
                value={state.name}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs>
              <LoadingButton
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                loading={loading}
              >
                Добавить
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;