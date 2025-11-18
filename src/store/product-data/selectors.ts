import { createSelector } from '@reduxjs/toolkit';

import type { Product } from '@src/types/product';
import type { State } from '@src/types/state';
import { StoreSlice } from '@src/const';

export const getProducts = (state: State): Product[] => state[StoreSlice.ProductData].products;
export const getIsProductsLoading = (state: State): boolean => state[StoreSlice.ProductData].isProductsDataLoading;

export const selectRandomProducts = createSelector(getProducts, (products) => products
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, 3)
);
