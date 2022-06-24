import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, LinearProgress } from '@mui/material';
import InputField from 'components/form-controls/InputField';
import PasswordField from 'components/form-controls/PasswordField';
import FullwidthGridItem from 'components/FullwidthGridItem';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
LoginForm.defaultProps = {
  onSubmit: null,
};

export default function LoginForm({ onSubmit }) {
  const schema = yup.object().shape({
    identifier: yup.string().trim().required('This field is required').email('Please enter a valid email address'),
    password: yup.string().trim().required('This field is required'),
  });

  const { control, handleSubmit, formState, reset } = useForm({
    mode: 'onBlur',
    defaultValues: {
      identifier: '',
      password: '',
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
        <FullwidthGridItem>
          <InputField control={control} name='identifier' label='Email' />
        </FullwidthGridItem>
        <FullwidthGridItem>
          <PasswordField control={control} name='password' label='Password' />
        </FullwidthGridItem>
        <FullwidthGridItem>
          <Button disabled={formState.isSubmitting} type='submit' fullWidth variant='contained'>
            {formState.isSubmitting && <CircularProgress thickness={2} size={25} sx={{ mr: 2 }} />} Login
          </Button>
        </FullwidthGridItem>
      </Grid>
    </Box>
  );
}
