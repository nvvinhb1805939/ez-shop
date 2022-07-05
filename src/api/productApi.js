import axiosClient from './axiosClient';

const DEFAULT_ITEMS = 50;

const productApi = {
  async getAll(params) {
    const newParams = { ...params };
    newParams._start = !params._page || params._page <= 1 ? 0 : (params._page - 1) * (params._limit || DEFAULT_ITEMS);

    delete newParams._page;

    const productList = await axiosClient.get('/products', { params: newParams });
    const count = await axiosClient.get('/products/count', { params: newParams });

    return {
      data: productList,
      pagination: {
        page: params._page,
        limit: params._limit,
        total: count,
      },
    };
  },
  get(productID) {
    const url = `/products/${productID}`;
    return axiosClient.get(url);
  },
};

export default productApi;
