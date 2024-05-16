import {Grid, Typography, useMediaQuery} from '@mui/material';
import {Outlet} from 'react-router-dom';
import Navigation from './Navigation.tsx';
import {useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../usersSlice.ts';


const AdminProfile = () => {
  const isSmallScreen = useMediaQuery('(max-width:760px)');
  const user = useAppSelector(selectUser);
  return (
    <>
      <Grid container direction={isSmallScreen ? 'column' : 'row'}>
        <Grid
          item
          xs={12}
          px={3}
          mb={5}
          pb={4}
          sx={{ borderBottom: '1px solid #5F9EA0' }}
        >
          <Typography variant="h6">
            Добро пожаловать, {user?.email}!
          </Typography>
        </Grid>
        <Grid item xs={3} pr={2}>
          <Navigation />
        </Grid>
        <Grid item xs={9} px={3} pt={2}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminProfile;