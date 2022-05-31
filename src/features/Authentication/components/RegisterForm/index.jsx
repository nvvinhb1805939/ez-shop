import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, LinearProgress } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
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
    fullName: yup
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

  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      retypePassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async data => {
    if (!onSubmit) return;
    await onSubmit(data);
    reset();
  };

  return (
    <Box component='form' onSubmit={handleSubmit(handleOnSubmit)}>
      {formState.isSubmitting && <LinearProgress sx={{ position: 'absolute', top: 8, left: 0, right: 0 }} />}
      <Grid container rowSpacing={3}>
        <FullwithGridItem>
          <InputField control={control} name='fullName' label='Fullname' />
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
          <Button disabled={formState.isSubmitting} type='submit' fullWidth variant='contained'>
            {formState.isSubmitting && <CircularProgress thickness={2} size={25} sx={{ mr: 2 }} />} Register
          </Button>
        </FullwithGridItem>
      </Grid>
    </Box>
  );
}
