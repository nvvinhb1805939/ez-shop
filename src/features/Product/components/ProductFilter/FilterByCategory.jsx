import { Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import categoryApi from 'api/categoryApi';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

function FilterByCategory({ filters = {}, onChange = null }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        const newCategories = response.map(category => ({ id: category.id, name: category.name }));
        setCategories(newCategories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleCategoryClick = (filters, categoryID) => {
    if (!onChange) return;
    onChange({ ...filters, 'category.id': categoryID });
  };

  return (
    <Box>
      <Typography variant='body1' component='h3' sx={{ pl: 1, fontWeight: 600, color: 'primary.main' }}>
        Danh mục sản phẩm
      </Typography>
      <List>
        {categories.map(category => (
          <ListItem key={category.id} disablePadding onClick={() => handleCategoryClick(filters, category.id)}>
            <ListItemButton sx={{ py: 0 }}>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default FilterByCategory;
