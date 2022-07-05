import React from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <Routes>
      <Route path='/' element={<ProductListPage />} />
      <Route path='/:productDetailID' element={<ProductDetailPage />} />
    </Routes>
  );
}

export default ProductFeature;
