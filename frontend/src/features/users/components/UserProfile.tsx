import {Grid, Typography, useMediaQuery} from '@mui/material';
import {useAppSelector} from '../../../app/hooks.ts';
import {selectUser} from '../usersSlice.ts';
import CourseHistoryList from '../../courseHistories/components/CourseHistoryList.tsx';



const UserProfile = () => {
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
          <CourseHistoryList />
      </Grid>
    </>
  );
};

export default UserProfile;