import { createSelector } from '@reduxjs/toolkit';

import type { Product, ProductReview } from '@src/types/product';
import type { State } from '@src/types/state';
import { StoreSlice } from '@src/const';

import { getCategoryFilter, getTypeFilter } from '../product-process/selectors';

export const getProduct = (state: State): Product | null => state[StoreSlice.ProductData].product;
export const getProducts = (state: State): Product[] => state[StoreSlice.ProductData].products;
export const getIsProductsLoading = (state: State): boolean => state[StoreSlice.ProductData].isProductsDataLoading;

export const getReviews = (state: State): ProductReview[] => state[StoreSlice.ProductData].reviews;
export const getIsReviewsLoadingError = (state: State): boolean => state[StoreSlice.ProductData].isReviewsLoadingError;
export const getLastReview = (state: State): ProductReview | null => state[StoreSlice.ProductData].lastReview;

export const getRandomProducts = createSelector(getProducts, (products) =>
  products
    .slice()
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
);

export const getFilteredProducts = createSelector(
  [getProducts, getCategoryFilter, getTypeFilter],
  (products, categoryFilter, typeFilter) =>
    products
      .filter((product) => categoryFilter && product.category === categoryFilter || !categoryFilter)
      .filter((product) => categoryFilter && typeFilter.length && typeFilter.includes(product.type) || !typeFilter.length),
);
