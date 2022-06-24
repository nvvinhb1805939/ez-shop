import { Box, Grid, Typography } from '@mui/material';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constant/common';
import PropTypes from 'prop-types';
import React from 'react';
import formatPrice from 'utils/formatPrice';

Products.propTypes = {
  data: PropTypes.array,
};
Products.defaultProps = {
  data: [],
};

function Products({ data }) {
  const getThumbnail = url => (url ? `${STATIC_HOST}${url}` : THUMBNAIL_PLACEHOLDER);

  return (
    <Grid container columnSpacing={1} rowSpacing={2} sx={{ p: 1 }}>
      {data.map(product => (
        <Grid key={product.id} item xs={12} sm={12} md={6} lg={3}>
          <Box
            sx={{
              p: 1,
            }}
          >
            <img src={getThumbnail(product.thumbnail?.url)} alt={product.name} />
          </Box>
          <Typography>{product.name}</Typography>
          <Typography variant='body2'>
            <Box component='span' sx={{ mr: 1, fontSize: 16, fontWeight: 600 }}>
              {formatPrice(product.salePrice)}
            </Box>
            <Box component='span'>{!!product.promotionPercent && `-${product.promotionPercent}%`}</Box>
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;
