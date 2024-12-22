import { styled } from '@mui/material/styles';
import { useState, memo } from 'react';
import {
  Divider,
  Menu,
  MenuItem as MuiMenuItem,
  ListItemText,
  ListItemIcon,
  listItemIconClasses,
} from '@mui/material';
import {
  LogoutRounded as LogoutRoundedIcon,
  MoreVertRounded as MoreVertRoundedIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { logout } from '../redux/sessionSlice';
import MenuButton from './MenuButton';

const MenuItem = styled(MuiMenuItem)({
  margin: '2px 0',
});

const OptionsMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    dispatch(logout());
    navigate('/login');
    console.log('User logged out successfully');
  };

  return (
    <>
      <MenuButton
        aria-label='Open menu'
        onClick={handleClick}
        sx={{ borderColor: 'transparent', color: 'white' }}
      >
        <MoreVertRoundedIcon className='icon' />
      </MenuButton>
      <Menu
        anchorEl={anchorEl}
        id='menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        sx={{
          '.MuiList-root': {
            padding: '4px',
          },
          '.MuiPaper-root': {
            padding: 0,
            width: '10em',
          },
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: 'auto',
              minWidth: 0,
            },
          }}
        >
          <ListItemText>Logout</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize='small' />
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(OptionsMenu);
