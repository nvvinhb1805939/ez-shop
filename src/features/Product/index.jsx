import { Route, Routes } from 'react-router-dom';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductListPage from './pages/ProductListPage';

function ProductFeature(props) {
  return (
    <Routes>
      <Route path='/' element={<ProductListPage />} />
      <Route path='/:productDetailID/*' element={<ProductDetailPage />} />
    </Routes>
  );
}

export default ProductFeature;
