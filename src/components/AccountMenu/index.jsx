import Logout from '@mui/icons-material/Logout';
import Settings from '@mui/icons-material/Settings';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from 'features/Authentication/authSlice';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';

AccountMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object,
  onMenuClose: PropTypes.func,
};
AccountMenu.defaultProps = {
  anchorEl: null,
  onMenuClose: null,
};

export default function AccountMenu({ open, anchorEl, onMenuClose }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    if (onMenuClose) onMenuClose();
  };
  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id='account-menu'
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,

        sx: {
          mt: 1.5,
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          overflow: 'visible',

          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },

          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 14,

            display: 'block',
            width: 10,
            height: 10,

            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <ListItemIcon>
          <Settings fontSize='small' />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={handleLogoutClick}>
        <ListItemIcon>
          <Logout fontSize='small' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
}
