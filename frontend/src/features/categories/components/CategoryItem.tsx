import React from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../../users/usersSlice.ts';
import {useNavigate} from 'react-router-dom';
import {appRoutes} from '../../../utils/constants.ts';
import {Card, CardActions, CardContent, Grid, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import CancelIcon from '@mui/icons-material/Cancel';
import {selectCategoryDeleting} from '../containers/categoriesSlice.ts';
import {deleteCategory, fetchCategories} from '../containers/categoriesThunk.ts';

interface Props {
  _id: string;
  name: string;
}


const CategoryItem: React.FC<Props>  = ({_id, name}) => {
  const user = useAppSelector(selectUser);
  const isDelete = useAppSelector(selectCategoryDeleting);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteHandler = async () => {
    await dispatch(deleteCategory(_id));
    await dispatch(fetchCategories());
    navigate(appRoutes.categories);
  };

  return (
      <Card variant="outlined" sx={{height: '100%', minWidth: 100,  mb: '20px'}}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <CardContent>
              <Typography>
                <strong>{name}</strong>
              </Typography>
            </CardContent>
          </Grid>
          <Grid item>
            <CardActions>
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
            </CardActions>
          </Grid>
        </Grid>
      </Card>
  );
};

export default CategoryItem;