import { combineReducers } from '@reduxjs/toolkit';

import { productData } from './product-data/product-data';

import { StoreSlice } from '@src/const';

export const rootReducer = combineReducers({
  [StoreSlice.ProductData]: productData.reducer,
});
