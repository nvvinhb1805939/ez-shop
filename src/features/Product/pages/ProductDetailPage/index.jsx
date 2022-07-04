import { Container, Grid, Paper } from '@mui/material';
import ProductThumbnail from 'features/Product/components/ProductThumbnail';

ProductDetailPage.propTypes = {};

function ProductDetailPage(props) {
  return (
    <Container component='section'>
      <Grid container columnSpacing={0.25} sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <Grid item lg={6}>
          <Paper elevation={0} sx={{ p: 1, borderRadius: 0 }}>
            <ProductThumbnail />
          </Paper>
        </Grid>
        <Grid item lg={6}>
          <Paper elevation={0} sx={{ p: 1, borderRadius: 0 }}>
            content
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductDetailPage;
