import { combineReducers } from '@reduxjs/toolkit';

import { StoreSlice } from '@src/const';

import { productData } from './product-data/product-data';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [StoreSlice.ProductData]: productData.reducer,
  [StoreSlice.UserProcess]: userProcess.reducer,
});
