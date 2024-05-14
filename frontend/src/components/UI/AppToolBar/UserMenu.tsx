import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks';
import { logout } from '../../../features/users/usersThunk';
import {User} from '../../../types/types';

interface Props {
  user: User;
}
const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        {user.email}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;