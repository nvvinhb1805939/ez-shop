import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';

PasswordField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
};
PasswordField.defaultProps = {
  required: false,
  variant: 'outlined',
  size: 'small',
};

function PasswordField(props) {
  const { control, name, label, required, variant, size } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <FormControl variant={variant} size={size} error={!!errors?.[name]} fullWidth>
          <InputLabel htmlFor={name}>{label}</InputLabel>
          <OutlinedInput
            id={name}
            name={name}
            label={label}
            required={required}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={toggleShowPassword} edge='end'>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText>{errors?.[name]?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
}

export default PasswordField;
