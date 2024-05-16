import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {categoriesState} from '../containers/categoriesSlice.ts';
import {useEffect} from 'react';
import {fetchCategories} from '../containers/categoriesThunk.ts';
import {Card, CardContent, Stack, Typography} from '@mui/material';


const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(categoriesState);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);



  return (
    <div>
      {categories.map(category => (
        <Stack>
          <Card variant="outlined" sx={{ minWidth: 100, mb: '20px' }}>
            <CardContent>
              <Typography>{category.name}</Typography>
            </CardContent>
          </Card>
        </Stack>
      ))}
    </div>
  );
};

export default Categories;