import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Skeleton } from '@mui/material';
import { INITIAL_QUANTITY_PRODUCT } from 'constant/common';

ProductsSkeleton.propTypes = {
  length: PropTypes.number,
};
ProductsSkeleton.defaultProps = {
  length: INITIAL_QUANTITY_PRODUCT,
};

function ProductsSkeleton({ length }) {
  return (
    <Grid container columnSpacing={1} rowSpacing={2} sx={{ p: 1 }}>
      {Array.from(new Array(length)).map((item, index) => (
        <Grid item xs={12} sm={12} md={6} lg={3} key={index}>
          <Skeleton variant='rectangular' width='100%' height={118} />
          <Skeleton />
          <Skeleton width='60%' />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductsSkeleton;
