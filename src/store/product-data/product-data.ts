import { createSlice } from '@reduxjs/toolkit';

import type { ProductData } from '@src/types/state';
import { StoreSlice, SubmitStatus } from '@src/const';

import { deleteFavoriteStatusAction,fetchFavouritesAction, fetchLastReviewAction, fetchProductAction, fetchProductsAction, fetchReviewsAction, postReviewAction, putFavoriteStatusAction } from '../api-actions';

const initialState: ProductData = {
  product: null,
  products: [],
  isProductsDataLoading: false,
  reviews: [],
  isReviewsLoadingError: false,
  lastReview: null,
  reviewStatus: SubmitStatus.Still,
  favourites: [],
  isFavouritesDataLoading: false,
};

export const productData = createSlice({
  name: StoreSlice.ProductData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Product
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

      // Reviews
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsLoadingError = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isReviewsLoadingError = true;
      })
      .addCase(fetchLastReviewAction.fulfilled, (state, action) => {
        state.lastReview = action.payload;
      })
      .addCase(postReviewAction.pending, (state) => {
        state.reviewStatus = SubmitStatus.Pending;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.reviews = [...state.reviews, action.payload];
        state.reviewStatus = SubmitStatus.Fullfilled;
      })
      .addCase(postReviewAction.rejected, (state) => {
        state.reviewStatus = SubmitStatus.Rejected;
      })

      // Favourites
      .addCase(fetchFavouritesAction.pending, (state) => {
        state.isFavouritesDataLoading = true;
      })
      .addCase(fetchFavouritesAction.fulfilled, (state, action) => {
        state.favourites = action.payload;
        state.isFavouritesDataLoading = false;
      })
      .addCase(putFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedProduct = action.payload;

        state.products = state.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
        state.favourites = [...state.favourites, updatedProduct];
        if (state.product && state.product.id === updatedProduct.id) {
          state.product = updatedProduct;
        }
      })
      .addCase(deleteFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedProduct = action.payload;

        state.products = state.products.map((product) => (product.id === updatedProduct.id ? updatedProduct : product));
        state.favourites = state.favourites.filter((item) => item.id !== updatedProduct.id);
        if (state.product && state.product.id === updatedProduct.id) {
          state.product = updatedProduct;
        }
      });
  },
});
