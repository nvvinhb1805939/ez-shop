import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constant/common';

export const getThumbnail = url => (url ? `${STATIC_HOST}${url}` : THUMBNAIL_PLACEHOLDER);

export const getLengthObject = obj => Object.keys(obj).length;

export const formatPrice = price =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
