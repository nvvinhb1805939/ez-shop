import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Link,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import AccountMenu from 'components/AccountMenu';
import Login from 'features/Authentication/components/Login';
import Register from 'features/Authentication/components/Register';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

Header.propTypes = {};

const MODE = {
  LOGIN: 'login',
  REGISTER: 'register',
};

const RowStack = ({ children }) => (
  <Stack
    direction='row'
    spacing={1}
    sx={{ justifyContent: 'center', alignItems: 'center', mt: 3, '& a': { color: 'primary.main' } }}
  >
    {children}
  </Stack>
);

function Header() {
  const user = useSelector(state => state.user.current);
  const isLogin = !!user.id;
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);
  const openAccountMenu = !!anchorEl;

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = (event, reason) => {
    if (!reason) {
      setOpenDialog(false);
    }
  };

  const handleClickOpenAccountMenu = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseAccountMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='primary'>
        <Container maxWidth='lg'>
          <Toolbar disableGutters>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                mr: 'auto',
                '& > a': {
                  textDecoration: 'none',
                  color: 'primary.contrastText',
                },
              }}
            >
              {' '}
              <Link to='/'>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  .shop
                </Typography>
              </Link>
            </Box>
            {!isLogin && (
              <Button
                color='inherit'
                onClick={() => {
                  handleClickOpenDialog();
                  setMode(MODE.LOGIN);
                }}
              >
                Login
              </Button>
            )}
            {isLogin && (
              <>
                <Tooltip title='Account settings'>
                  <IconButton onClick={handleClickOpenAccountMenu} size='small'>
                    <Avatar sx={{ width: 32, height: 32 }} />
                  </IconButton>
                </Tooltip>
                <AccountMenu anchorEl={anchorEl} open={openAccountMenu} onMenuClose={handleCloseAccountMenu} />
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        open={openDialog}
        onClose={(event, reason) => {
          handleCloseDialog(event, reason);
        }}
      >
        <DialogContent
          sx={{
            '&::-webkit-scrollbar': { width: 4 },
          }}
        >
          {mode === MODE.REGISTER && (
            <>
              <Register closeModal={handleCloseDialog} />
              <RowStack>
                <Typography>Already have an account?</Typography>
                <Link component='button' underline='none' variant='button' onClick={() => setMode(MODE.LOGIN)}>
                  Log in
                </Link>
              </RowStack>
            </>
          )}
          {mode === MODE.LOGIN && (
            <>
              <Login closeModal={handleCloseDialog} />
              <RowStack>
                <Typography>Don't have an account?</Typography>
                <Link component='button' underline='none' variant='button' onClick={() => setMode(MODE.REGISTER)}>
                  Register
                </Link>
              </RowStack>
            </>
          )}
        </DialogContent>
        <DialogActions sx={{ position: 'absolute', top: 1, right: 1 }}>
          <IconButton onClick={handleCloseDialog} color='error'>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Header;
