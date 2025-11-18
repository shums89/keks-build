import { createSlice } from '@reduxjs/toolkit';

import type { ProductData } from '@src/types/state';

import { fetchProductsAction } from '../api-actions';

import { StoreSlice } from '@src/const';

const initialState: ProductData = {
  products: [],
  isProductsDataLoading: false,
};

export const productData = createSlice({
  name: StoreSlice.ProductData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsDataLoading = false;
      });
  },
});
