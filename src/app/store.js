import { configureStore } from '@reduxjs/toolkit';
import productDetailReducer from '../features/productDetailSlice';
import QuantityReducer from '../features/QuantitySlice';
import userSliceReducer from '../features/userSlice';

export const store = configureStore({
  reducer: {
    productDetail: productDetailReducer,
    counts: QuantityReducer,
    user: userSliceReducer,
  },
});
