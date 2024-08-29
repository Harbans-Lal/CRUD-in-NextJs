import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/entitiesSlice'

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
