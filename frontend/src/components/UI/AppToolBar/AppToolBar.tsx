import { NavLink } from 'react-router-dom';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';
import {appRoutes} from '../../../utils/constants.ts';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);

  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            <Link to={appRoutes.home}>LeGko</Link>
          </Typography>
          { user ? (
            <UserMenu user={user}/>
          ) : (
            <GuestMenu />
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;