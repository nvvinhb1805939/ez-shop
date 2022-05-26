import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

InputField.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
};
InputField.defaultProps = {
  required: false,
  variant: 'outlined',
  size: 'small',
};

function InputField(props) {
  const { control, name, label, required, variant, size } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, formState: { errors } }) => (
        <TextField
          id={name}
          name={name}
          label={label}
          required={required}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          variant={variant}
          error={!!errors?.[name]}
          helperText={errors?.[name]?.message}
          size={size}
          fullWidth
        />
      )}
    />
  );
}

export default InputField;
