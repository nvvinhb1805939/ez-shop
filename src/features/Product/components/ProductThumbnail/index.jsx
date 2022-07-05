import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import { getThumbnail } from 'utils';

ProductThumbnail.propTypes = {
  name: PropTypes.string,
  url: PropTypes.string,
};

function ProductThumbnail({ url = '', name = 'img' }) {
  return (
    <Box
      sx={{
        p: 1,
      }}
    >
      <img src={getThumbnail(url)} alt={name} />
    </Box>
  );
}

export default ProductThumbnail;
