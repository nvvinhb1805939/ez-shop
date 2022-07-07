import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import ProductAdditional from './ProductAdditional';
import ProductDescription from './ProductDescription';
import ProductReviews from './ProductReviews';
import PropTypes from 'prop-types';

ProductInfo.propTypes = {
  product: PropTypes.object,
};

function ProductInfo({ product = {} }) {
  const navigate = useNavigate();
  const params = useParams();

  const [tabValue, setTabValue] = useState(params['*'] || '');

  const handleOnSortChange = (event, value) => {
    setTabValue(value);
    navigate(value);
  };

  return (
    <Box>
      <Box sx={{ mb: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleOnSortChange}>
          <Tab label='Description' value='' />
          <Tab label='Additional' value='additional' />
          <Tab label='Reviews' value='reviews' />
        </Tabs>
      </Box>

      <Routes>
        <Route path='/' element={<ProductDescription description={product.description} />} />
        <Route path='additional' element={<ProductAdditional />} />
        <Route path='reviews' element={<ProductReviews />} />
      </Routes>
    </Box>
  );
}

export default ProductInfo;
