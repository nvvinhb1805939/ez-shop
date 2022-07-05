import { Container, Grid, Paper } from '@mui/material';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';
import useProductDetail from 'features/Product/hooks/useProductDetail';
import { useParams } from 'react-router-dom';
import { getParamID } from 'utils';

function ProductDetailPage() {
  const { productDetailID } = useParams();
  const { product, loading } = useProductDetail(getParamID(productDetailID));

  return (
    <Container component='section'>
      <Grid container columnSpacing={0.25} sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <Grid item lg={5}>
          <Paper elevation={0} sx={{ p: 1, borderRadius: 0 }}>
            <ProductThumbnail name={product.name} url={product.thumbnail?.url} />
          </Paper>
        </Grid>
        <Grid item lg={7}>
          <Paper elevation={0} sx={{ p: 1, borderRadius: 0 }}>
            content
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetailPage;
