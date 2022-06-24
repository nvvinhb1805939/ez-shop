import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Input, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';

FilterByPrice.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterByPrice({ filters = {}, onChange = null }) {
  const [price, setPrice] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });

  const handlePriceChange = e => {
    setPrice(prevPrice => ({
      ...prevPrice,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmitPriceChange = (filters, price) => {
    if (!onChange) return;

    const { salePrice_gte, salePrice_lte } = price;

    if (!salePrice_gte && !salePrice_lte) return;
    if (!salePrice_lte) delete price.salePrice_lte;

    onChange({ ...filters, ...price });
  };

  return (
    <Box>
      <Typography variant='body1' component='h3' sx={{ pl: 1, fontWeight: 600, color: 'primary.main' }}>
        Giá
      </Typography>
      <List sx={{ display: 'flex' }}>
        <ListItem>
          <Input name='salePrice_gte' value={price.salePrice_gte || ''} onChange={handlePriceChange} />
        </ListItem>
        <ListItem sx={{ width: 'fit-content' }} disableGutters>
          -
        </ListItem>
        <ListItem>
          <Input name='salePrice_lte' value={price.salePrice_lte || ''} onChange={handlePriceChange} />
        </ListItem>
      </List>
      <Button
        variant='outlined'
        sx={{ ml: 2, mb: 2 }}
        onClick={() => {
          handleSubmitPriceChange(filters, price);
        }}
      >
        Áp dụng
      </Button>
    </Box>
  );
}

export default FilterByPrice;
