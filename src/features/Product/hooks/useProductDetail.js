import productApi from 'api/productApi';
import React, { useState } from 'react';
import { useEffect } from 'react';

function useProductDetail(productID) {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async productID => {
      try {
        const response = await productApi.get(productID);
        setProduct(response);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })(productID);
  }, [productID]);

  return { loading, product };
}

export default useProductDetail;
