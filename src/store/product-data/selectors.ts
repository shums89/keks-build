import { createSelector } from '@reduxjs/toolkit';

import type { Product, ProductReview } from '@src/types/product';
import type { State } from '@src/types/state';
import { StoreSlice } from '@src/const';

export const getProducts = (state: State): Product[] => state[StoreSlice.ProductData].products;
export const getIsProductsLoading = (state: State): boolean => state[StoreSlice.ProductData].isProductsDataLoading;

export const getLastReview = (state: State): ProductReview | null => state[StoreSlice.ProductData].lastReview;

export const selectRandomProducts = createSelector(getProducts, (products) => products
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, 3)
);
