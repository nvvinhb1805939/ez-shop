import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <Routes>
      <Route path='/' element={<ProductListPage />} />
    </Routes>
  );
}

export default ProductFeature;
