import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { getThumbnail } from 'utils';

ProductThumbnail.propTypes = {
  url: PropTypes.string,
};

function ProductThumbnail({ url = '' }) {
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <img src={getThumbnail(url)} alt={'img'} />
    </Box>
  );
}

export default ProductThumbnail;
