import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatPrice, getThumbnail, toSpinalCase } from 'utils';

Products.propTypes = {
  data: PropTypes.array,
};
Products.defaultProps = {
  data: [],
};

function Products({ data }) {
  return (
    <Grid container columnSpacing={1} rowSpacing={2} sx={{ p: 1 }}>
      {data.map(product => (
        <Grid key={product.id} item xs={12} sm={12} md={6} lg={3}>
          <Link to={toSpinalCase(`${product.name}-${product.id}`)}>
            <Box
              sx={{
                p: 1,
              }}
            >
              <img src={getThumbnail(product.thumbnail?.url)} alt={product.name} />
            </Box>
            <Typography>{product.name}</Typography>
            <Typography variant='body2'>
              <Box component='span' sx={{ mr: 1, fontSize: 16, fontWeight: 600 }}>
                {formatPrice(product.salePrice)}
              </Box>
              <Box component='span'>{!!product.promotionPercent && `-${product.promotionPercent}%`}</Box>
            </Typography>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;
