import React from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, Divider, Stack, Typography } from '@mui/material';
import { formatPrice } from 'utils';

ProductDetail.propTypes = {
  product: PropTypes.object,
};

function ProductDetail({ product = {} }) {
  const { name, shortDescription, salePrice, originalPrice, promotionPercent } = product;

  return (
    <Box sx={{ p: 1, borderColor: 'primary.main' }}>
      <Typography component='h1' variant='h4' sx={{ color: 'primary.main' }}>
        {name}
      </Typography>
      <Typography
        sx={{
          py: 1,
          px: 2,
          mt: 2,

          border: '1px dashed',
          borderColor: 'primary.main',
          borderRadius: 2,
        }}
      >
        {shortDescription}
      </Typography>
      <Stack direction='row' alignItems='center' spacing={3} sx={{ mt: 2, mb: 2 }}>
        <Typography component='span' variant='h6'>
          {formatPrice(salePrice)}
        </Typography>
        {promotionPercent > 0 && (
          <>
            <Typography component='span' variant='body2' sx={{ textDecoration: 'line-through' }}>
              {formatPrice(originalPrice)}
            </Typography>
            <Chip label={`-${promotionPercent}%`} color='primary' variant='outlined' />
          </>
        )}
      </Stack>
      <Divider />
    </Box>
  );
}

export default ProductDetail;
