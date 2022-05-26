import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react';
import RegisterForm from '../RegisterForm';

Register.propTypes = {};

function Register(props) {
  const handleSubmit = data => {
    console.log(data);
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
