import { combineReducers } from '@reduxjs/toolkit';

import { StoreSlice } from '@src/const';

import { productData } from './product-data/product-data';

export const rootReducer = combineReducers({
  [StoreSlice.ProductData]: productData.reducer,
});
