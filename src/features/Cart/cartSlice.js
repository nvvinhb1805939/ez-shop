import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    toggleMiniCart: state => {
      state.showMiniCart = !state.showMiniCart;
    },
    addItemToCart(state, action) {
      const addedItem = action.payload;
      const addedItemId = addedItem.product.id;
      const addedItemIndex = state.cartItems.findIndex(cartItem => cartItem.product.id === addedItemId);

      if (addedItemIndex >= 0) {
        state.cartItems[addedItemIndex].quantity += addedItem.quantity;
      } else {
        state.cartItems.push(addedItem);
      }
    },
    updateQuantityItem(state, action) {
      const updatedItemId = action.payload.product.id;
      const updatedItemIndex = state.cartItems.findIndex(cartItem => cartItem.product.id === updatedItemId);

      if (updatedItemIndex >= 0) state.cartItems[updatedItemIndex].quantity = action.payload.quantity;
    },
    removeItemFromCart(state, action) {
      const removedItemId = action.payload.product.id;
      state.cartItems.filter(cartItem => cartItem.product.id === removedItemId);
    },
  },
});

const { actions, reducer } = cartSlice;
export const { toggleMiniCart, addItemToCart, updateQuantityItem, removeItemFromCart } = actions;
export default reducer;
