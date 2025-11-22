import { createSlice } from '@reduxjs/toolkit';

import type { ProductData } from '@src/types/state';
import { StoreSlice } from '@src/const';

import { fetchLastReviewAction, fetchProductAction, fetchProductsAction, fetchReviewsAction } from '../api-actions';

const initialState: ProductData = {
  product: null,
  products: [],
  isProductsDataLoading: false,
  reviews: [],
  isReviewsLoadingError: false,
  lastReview: null,
};

export const productData = createSlice({
  name: StoreSlice.ProductData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductAction.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(fetchProductsAction.pending, (state) => {
        state.isProductsDataLoading = true;
      })
      .addCase(fetchProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsDataLoading = false;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoadingError = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoadingError = true;
      })
      .addCase(fetchLastReviewAction.fulfilled, (state, action) => {
        state.lastReview = action.payload;
      });
  },
});
