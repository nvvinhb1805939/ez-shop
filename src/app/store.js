import { configureStore } from '@reduxjs/toolkit';
import baseReducer from 'features/BaseFeature/baseSlice';

const rootReducer = {
  base: baseReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
