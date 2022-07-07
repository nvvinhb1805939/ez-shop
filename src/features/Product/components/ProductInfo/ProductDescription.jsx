import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
  description: PropTypes.string,
};

function ProductDescription({ description = '' }) {
  const safeDescription = DOMPurify.sanitize(description);
  return <Box dangerouslySetInnerHTML={{ __html: safeDescription }} />;
}

export default ProductDescription;
