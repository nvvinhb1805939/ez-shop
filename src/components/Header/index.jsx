import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import Register from 'features/Authentication/components/Register';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

Header.propTypes = {};

function Header(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (!reason) {
      setOpen(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color='primary'>
        <Container maxWidth='lg'>
          <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                '& > a': {
                  textDecoration: 'none',
                  color: 'primary.contrastText',
                },
              }}
            >
              {' '}
              <Link to='/'>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  .ezshop
                </Typography>
              </Link>
            </Box>
            <Button color='inherit' onClick={handleClickOpen} sx={{ ml: 'auto' }}>
              Register
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
      <Dialog
        open={open}
        onClose={(event, reason) => {
          handleClose(event, reason);
        }}
      >
        <DialogContent>
          <Register />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Header;
