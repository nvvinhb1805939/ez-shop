import { CircularProgress, Container, Grid, Paper, Stack } from '@mui/material';
import AddToCart from 'features/Product/components/AddToCart';
import ProductDetail from 'features/Product/components/ProductDetail';
import ProductInfo from 'features/Product/components/ProductInfo';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import useProductDetail from 'features/Product/hooks/useProductDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getParamID } from 'utils';
import { addItemToCart } from 'features/Cart/cartSlice';
import { cartCountSelector, cartTotalSelector } from 'features/Cart/selectors';

function ProductDetailPage() {
  const dispatch = useDispatch();
  const cartCount = useSelector(cartCountSelector);
  const cartTotal = useSelector(cartTotalSelector);

  const { productDetailID } = useParams();
  const { product, loading } = useProductDetail(getParamID(productDetailID));

  const handleAddToCart = ({ quantity }) => {
    dispatch(
      addItemToCart({
        product,
        quantity,
      })
    );
    console.log({ cartCount, cartTotal });
  };

  return loading ? (
    <Stack
      justifyContent='center'
      alignItems='center'
      sx={{ position: 'fixed', inset: 0, zIndex: 1101, bgcolor: 'primary.contrastText' }}
    >
      <CircularProgress />
    </Stack>
  ) : (
    <Container component='section'>
      <Grid container spacing={0.25} sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <Grid item lg={5}>
          <Paper elevation={0} sx={{ p: 1, borderRadius: 0 }}>
            <ProductThumbnail name={product.name} url={product.thumbnail?.url} />
          </Paper>
        </Grid>
        <Grid item lg={7}>
          <Paper elevation={0} sx={{ p: 1, height: '100%', borderRadius: 0 }}>
            <ProductDetail product={product} />
            <AddToCart onSubmit={handleAddToCart} />
          </Paper>
        </Grid>
        <Grid item lg={12}>
          <Paper elevation={0} sx={{ p: 2, height: '100%', borderRadius: 0 }}>
            <ProductInfo product={product} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetailPage;
