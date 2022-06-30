import { Container, Grid, Pagination, Paper } from '@mui/material';
import productApi from 'api/productApi';
import { INITIAL_QUANTITY_PRODUCT } from 'constant/common';
import ProductFilter from 'features/Product/components/ProductFilter';
import ProductFilterViewer from 'features/Product/components/ProductFilter/ProductFilterViewer';
import Products from 'features/Product/components/Products';
import ProductSort from 'features/Product/components/ProductSort';
import ProductsSkeleton from 'features/Product/components/ProductsSkeleton';
import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

ProductListPage.propTypes = {};

function ProductListPage(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: INITIAL_QUANTITY_PRODUCT,
    page: 1,
    total: INITIAL_QUANTITY_PRODUCT,
  });
  const [filters, setFilters] = useState(() => {
    const newFilters = {};

    for (const [key, value] of searchParams.entries()) {
      newFilters[key] = value;
    }
    console.log(newFilters);
    return {
      _page: 1,
      _limit: INITIAL_QUANTITY_PRODUCT,
      _sort: 'salePrice:ASC',
      ...newFilters,
    };
  });

  useEffect(() => {
    const queryParams = queryString.stringify(filters);
    setSearchParams(queryParams);
  }, [filters]);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(filters);
        setProducts(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();

    return () => setLoading(true);
  }, [filters]);

  const handlePaginationChange = (event, newPage) => {
    if (Number.parseInt(filters._page) !== newPage) {
      setFilters(prevFilters => ({
        ...prevFilters,
        _page: newPage,
      }));
    }
  };

  const handleSortChange = newSort => {
    setFilters(prevFilters => ({
      ...prevFilters,
      _sort: newSort,
    }));
  };

  const handleFilterChange = newFilters => {
    setFilters({ ...newFilters, _page: 1 });
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
