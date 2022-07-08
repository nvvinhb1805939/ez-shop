import { Box, Button } from '@mui/material';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

AddToCart.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCart({ onSubmit = null }) {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const handleAddToCart = formValues => {
    if (onSubmit) onSubmit(formValues);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(handleAddToCart)}
      sx={{
        mt: 0.5,
        px: 1,
      }}
    >
      <QuantityField control={control} name='quantity' label='Quantity' setValue={setValue} />
      <Button sx={{ display: 'block', mt: 1 }} variant='contained' type='submit'>
        Add to Cart
      </Button>
    </Box>
  );
}

export default AddToCart;
