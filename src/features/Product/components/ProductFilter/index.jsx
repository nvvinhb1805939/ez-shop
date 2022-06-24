import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import FilterByCategory from './FilterByCategory';
import FilterByPrice from './FilterByPrice';
import FilterByService from './FilterByService';

ProductFilter.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function ProductFilter({ filters = {}, onChange = null }) {
  const handleFilterChange = newFilters => {
    if (onChange) {
      onChange(newFilters);
    }
  };

  return (
    <Box>
      <FilterByCategory filters={filters} onChange={handleFilterChange} />
      <FilterByPrice filters={filters} onChange={handleFilterChange} />
      <FilterByService filters={filters} onChange={handleFilterChange} />
    </Box>
  );
}

export default ProductFilter;
