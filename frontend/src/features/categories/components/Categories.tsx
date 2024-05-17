import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {categoriesState} from '../containers/categoriesSlice.ts';
import {useEffect, useState} from 'react';
import {fetchCategories} from '../containers/categoriesThunk.ts';
import {Button, Grid, Stack} from '@mui/material';
import CategoryItem from './CategoryItem.tsx';
import {selectUser} from '../../users/usersSlice.ts';
import CategoryModal from './CategoryModal.tsx';


const Categories = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesState);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);



  return (
    <>
      <Grid container direction="column" spacing={2}>
        <Grid item container spacing={2}>
          {user && user.role === 'admin' && (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                Добавить категорию
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid item container m={2}>
          <Stack>
            {categories.map(category => (
              <CategoryItem
                key={category._id}
                name={category.name}
                _id={category._id}
              >
              </CategoryItem>
            ))}
          </Stack>
        </Grid>
      </Grid>
      <CategoryModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>



  );
};

export default Categories;