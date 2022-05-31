import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Stack, Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { login, register } from 'features/Authentication/authSlice';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../LoginForm';

Login.propTypes = {
  closeModal: PropTypes.func,
};
Login.defaultProps = {
  closeModal: null,
};

function Login({ closeModal }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async data => {
    try {
      data.username = data.email;
      const action = login(data);
      const response = await dispatch(action);
      const user = unwrapResult(response);
      if (closeModal) closeModal();
    } catch (error) {
      enqueueSnackbar(error, {
        variant: 'error',
      });
    }
  };

  return (
    <Stack alignItems='center'>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5' sx={{ mt: 1, mb: 3 }}>
        Login
      </Typography>
      <LoginForm onSubmit={handleSubmit} />
    </Stack>
  );
}

export default Login;
