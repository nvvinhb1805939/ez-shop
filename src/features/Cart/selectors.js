import { createSelector } from '@reduxjs/toolkit';

const cartItemsSelector = state => state.cart.cartItems;

export const cartCountSelector = createSelector(cartItemsSelector, cartItems => cartItems.length);

export const cartTotalSelector = createSelector(cartItemsSelector, cartItems =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.product.salePrice, 0)
);
