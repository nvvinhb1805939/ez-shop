import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Stack, Typography } from '@mui/material';
import userApi from 'api/userApi';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import RegisterForm from '../RegisterForm';

Register.propTypes = {
  closeModal: PropTypes.func,
};
Register.defaultProps = {
  closeModal: null,
};

function Register({ closeModal }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async data => {
    try {
      data.username = data.email;
      const response = await userApi.register(data);

      if (response?.user.id) {
        enqueueSnackbar('Register Successfully', {
          variant: 'success',
        });
      }

      if (closeModal) closeModal();
    } catch (error) {
      enqueueSnackbar(error.message, {
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
        Register
      </Typography>
      <RegisterForm onSubmit={handleSubmit} />
    </Stack>
  );
}

export default Register;
