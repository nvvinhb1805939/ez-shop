import { Container, Grid, Pagination, Paper } from '@mui/material';
import productApi from 'api/productApi';
import { INITIAL_QUANTITY_PRODUCT } from 'constant/common';
import ProductFilter from 'features/Product/components/ProductFilter';
import ProductFilterViewer from 'features/Product/components/ProductFilter/ProductFilterViewer';
import Products from 'features/Product/components/Products';
import ProductSort from 'features/Product/components/ProductSort';
import ProductsSkeleton from 'features/Product/components/ProductsSkeleton';
import queryString from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const INITIAL_FILTERS = { _page: 1, _limit: INITIAL_QUANTITY_PRODUCT, _sort: 'salePrice:ASC' };

function ProductListPage(props) {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: INITIAL_QUANTITY_PRODUCT,
    page: 1,
    total: INITIAL_QUANTITY_PRODUCT,
  });
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const filters = useMemo(() => {
    const newFilters = JSON.parse(JSON.stringify(queryString.parse(location.search)));
    return JSON.stringify(newFilters) === '{}' ? INITIAL_FILTERS : newFilters;
  }, [location.search]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        if (!isFirstLoad) setSearchParams(queryString.stringify(filters));
        setProducts(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      setIsFirstLoad(false);
    })();

    return () => setLoading(true);
  }, [filters]);

  const handlePaginationChange = (event, newPage) => {
    if (Number.parseInt(filters._page) !== newPage) {
      setSearchParams(queryString.stringify({ ...filters, _page: newPage }));
    }
  };

  const handleSortChange = newSort => {
    setSearchParams(queryString.stringify({ ...filters, _sort: newSort }));
  };

  const handleFilterChange = newFilters => {
    setSearchParams(queryString.stringify({ ...newFilters, _page: 1 }));
  };

  return (
    <Container component='section'>
      <Grid container columnSpacing={0.25} sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <Grid item sx={{ width: '260px' }}>
          <Paper elevation={0} sx={{ py: 2, borderRadius: 0 }}>
            <ProductFilter filters={filters} onChange={handleFilterChange} />
          </Paper>
        </Grid>
        <Grid item sx={{ flex: 1 }}>
          <Paper elevation={0} sx={{ borderRadius: 0 }}>
            <ProductSort currentSort={filters._sort} onSortChange={handleSortChange} />
            <ProductFilterViewer filters={filters} onChange={handleFilterChange} />
            {loading ? <ProductsSkeleton /> : <Products data={products} />}
          </Paper>
          <Pagination
            count={Math.ceil(pagination.total / pagination.limit)}
            onChange={handlePaginationChange}
            page={Number.parseInt(pagination.page)}
            color='primary'
            sx={{
              my: 2,

              '& > ul': {
                justifyContent: 'center',
              },
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductListPage;
