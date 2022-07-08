import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'features/Authentication/authSlice';
import cartReducer from 'features/Cart/cartSlice';

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
