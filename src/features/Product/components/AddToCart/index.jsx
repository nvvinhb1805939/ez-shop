import { Box, Button } from '@mui/material';
import QuantityField from 'components/form-controls/QuantityField';
import { useForm } from 'react-hook-form';

function AddToCart() {
  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const handleAddToCart = formValues => {
    console.log(formValues);
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
