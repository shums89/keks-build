import { createSlice } from '@reduxjs/toolkit';

import type { ProductData } from '@src/types/state';
import { StoreSlice } from '@src/const';

import { fetchLastReviewAction, fetchProductsAction } from '../api-actions';

const initialState: ProductData = {
  products: [],
  isProductsDataLoading: false,
  lastReview: null,
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
      })
      .addCase(fetchLastReviewAction.fulfilled, (state, action) => {
        state.lastReview = action.payload;
      });
  },
});
