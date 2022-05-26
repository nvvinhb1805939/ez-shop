import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Typography } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

const FullwithGridItem = ({ children, ...componentProps }) => (
  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} {...componentProps}>
    {children}
  </Grid>
);

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};
RegisterForm.defaultProps = {
  onSubmit: null,
};

export default function RegisterForm({ onSubmit }) {
  const schema = yup.object().shape({
    fullname: yup
      .string()
      .trim()
      .required('This field is required')
      .test(
        'Fullname should has at least two words',
        'Please enter at least two words',
        value => value.split(' ').length >= 2
      ),
    email: yup.string().trim().required('This field is required').email('Please enter a valid email address'),
    password: yup
      .string()
      .trim()
      .required('This field is required')
      .min(6, 'Please enter at least 6 characters')
      .max(14, 'Please enter maximum 14 character'),
    retypePassword: yup
      .string()
      .trim()
      .required('This field is required')
      .oneOf([yup.ref('password')], `Password doesn't match`),
  });

  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = data => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <Box component='form' onSubmit={handleSubmit(handleOnSubmit)}>
      <Grid container rowSpacing={3}>
        <FullwithGridItem>
          <InputField control={control} name='fullname' label='Fullname' />
        </FullwithGridItem>
        <FullwithGridItem>
          <InputField control={control} name='email' label='Email' />
        </FullwithGridItem>
        <FullwithGridItem>
          <PasswordField control={control} name='password' label='Password' />
        </FullwithGridItem>
        <FullwithGridItem>
          <PasswordField control={control} name='retypePassword' label='Retype Password' />
        </FullwithGridItem>
        <FullwithGridItem>
          <Button type='submit' fullWidth variant='contained'>
            Register
          </Button>
        </FullwithGridItem>
        <FullwithGridItem
          container
          justifyContent='center'
          sx={{
            columnGap: 1,

            '& > a': {
              color: 'primary.main',
            },
          }}
        >
          <Typography>Already have an account?</Typography>
          <Link to='/reset'>Log in</Link>
        </FullwithGridItem>
      </Grid>
    </Box>
  );
}
