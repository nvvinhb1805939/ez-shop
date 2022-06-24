import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@mui/material';

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onSortChange: PropTypes.func,
};
ProductSort.defaultProps = {
  onSortChange: null,
};

function ProductSort({ currentSort, onSortChange }) {
  const handleOnSortChange = (event, value) => {
    if (onSortChange) onSortChange(value);
  };

  return (
    <Box sx={{ mb: 1, borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={currentSort} onChange={handleOnSortChange}>
        <Tab label='Giá thấp đến cao' value='salePrice:ASC' />
        <Tab label='Giá cao đến thấp' value='salePrice:DESC' />
      </Tabs>
    </Box>
  );
}

export default ProductSort;
