import { Grid } from '@mui/material';
import React from 'react';

const FullwithGridItem = ({ children, ...componentProps }) => (
  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} {...componentProps}>
    {children}
  </Grid>
);

export default FullwithGridItem;
