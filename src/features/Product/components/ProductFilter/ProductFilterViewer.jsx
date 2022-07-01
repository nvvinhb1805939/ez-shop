import { Box, Chip, List, ListItem } from '@mui/material';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import formatPrice from 'utils/formatPrice';

ProductFilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

const FILTER_VIEWERS = [
  {
    id: 1,
    getLabel: () => 'Freeship',
    isActive: filters => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: filters => {
      const newFilters = { ...filters };
      if (newFilters.hasOwnProperty('isFreeShip')) delete newFilters.isFreeShip;
      else newFilters.isFreeShip = true;
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: () => true,
    isVisible: filters => filters.isPromotion,
    isRemovable: true,
    onRemove: filters => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 3,
    getLabel: (filters, categories) => {
      const label = categories.find(category => category.id === Number.parseInt(filters['category.id']))?.name;
      return label;
    },
    isActive: () => true,
    isVisible: filters => filters['category.id'],
    isRemovable: true,
    onRemove: filters => {
      const newFilters = { ...filters };
      delete newFilters['category.id'];
      return newFilters;
    },
    onToggle: () => {},
  },
  {
    id: 4,
    getLabel: filters => {
      const { salePrice_gte, salePrice_lte } = filters;
      if (!salePrice_lte) return `Từ ${formatPrice(salePrice_gte)}`;
      return `Từ ${formatPrice(salePrice_gte)} đến ${formatPrice(salePrice_lte)}`;
    },
    isActive: () => true,
    isVisible: filters => filters.hasOwnProperty('salePrice_gte') || filters.hasOwnProperty('salePrice_lte'),
    isRemovable: true,
    onRemove: filters => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_gte;
      delete newFilters.salePrice_lte;
      return newFilters;
    },
    onToggle: () => {},
  },
];

function ProductFilterViewer({ filters = {}, onChange = null }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        const newCategories = response.map(category => ({ id: category.id, name: category.name }));
        console.log(newCategories);
        setCategories(newCategories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Box>
      <List
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'flex-start',
          gap: 2,
          ml: 2,

          '& > li': { width: 'fit-content', p: 0 },
        }}
      >
        {FILTER_VIEWERS.filter(
          filterViewer => filterViewer.isVisible(filters) && filterViewer.getLabel(filters, categories)
        ).map(filterViewer => (
          <ListItem key={filterViewer.id}>
            <Chip
              label={filterViewer.getLabel(filters, categories)}
              color={filterViewer.isActive(filters) ? 'primary' : 'default'}
              variant={!filterViewer.isRemovable ? 'filled' : 'outlined'}
              clickable={!filterViewer.isRemovable}
              size='small'
              onClick={
                filterViewer.isRemovable
                  ? null
                  : () => {
                      if (!onChange) return;
                      const newFilters = filterViewer.onToggle(filters);
                      onChange(newFilters);
                    }
              }
              onDelete={
                filterViewer.isRemovable
                  ? () => {
                      if (!onChange) return;
                      const newFilters = filterViewer.onRemove(filters);
                      onChange(newFilters);
                    }
                  : null
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default ProductFilterViewer;
