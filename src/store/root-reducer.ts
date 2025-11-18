import { combineReducers } from '@reduxjs/toolkit';

import { StoreSlice } from '../const';

import { productData } from './product-data/product-data';

export const rootReducer = combineReducers({
  [StoreSlice.ProductData]: productData.reducer,
});
