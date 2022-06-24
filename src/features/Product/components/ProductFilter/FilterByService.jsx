import React from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, FormControlLabel, FormGroup, Input, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';

FilterByService.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const SERVICES = [
  { name: 'isPromotion', label: 'Đang khuyến mãi' },
  { name: 'isFreeShip', label: 'Freeship' },
];

function FilterByService({ filters = {}, onChange = null }) {
  const handleServiceChange = (event, filters) => {
    if (!onChange) return;

    const newFilters = { ...filters };
    const { name, checked } = event.target;
    if (checked) onChange({ ...newFilters, [name]: checked });
    else {
      delete newFilters[name];
      onChange(newFilters);
    }
  };

  return (
    <Box>
      <Typography variant='body1' component='h3' sx={{ pl: 1, fontWeight: 600, color: 'primary.main' }}>
        Dịch vụ
      </Typography>
      <List>
        {SERVICES.map((service, index) => (
          <ListItem key={index} sx={{ py: 0 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name={service.name}
                    checked={!!filters[service.name]}
                    onChange={event => handleServiceChange(event, filters)}
                  />
                }
                label={service.label}
              />
            </FormGroup>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FilterByService;
