import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { FormControl, IconButton, OutlinedInput, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  control: PropTypes.object.isRequired,
  setValue: PropTypes.func,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function QuantityField(props) {
  const { control, setValue = null, name, label } = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value } }) => (
        <FormControl>
          <Typography variant='h6' sx={{ mb: 0.5 }}>
            {label}
          </Typography>
          <Stack direction='row' columnGap={2} sx={{ py: 1 }}>
            <IconButton disabled={value <= 1} color='primary' onClick={() => setValue(name, +value - 1)}>
              <RemoveIcon />
            </IconButton>
            <OutlinedInput
              id={name}
              name={name}
              onBlur={event => {
                if (event.target.value === '') setValue(name, 1);
                onBlur();
              }}
              onChange={event => {
                const newValue = event.target.value;
                const regex = /^[1-9\b]\d*$/;
                if (newValue === '' || regex.test(newValue)) {
                  onChange(newValue);
                }
              }}
              value={value}
              size='small'
              sx={{ width: 40, '& > input': { p: 1, textAlign: 'center' } }}
            />
            <IconButton color='primary' onClick={() => setValue(name, +value + 1)}>
              <AddIcon />
            </IconButton>
          </Stack>
        </FormControl>
      )}
    />
  );
}

export default QuantityField;
