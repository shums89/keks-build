import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '@src/types/product';
import type { ProductProcess } from '@src/types/state';
import { PRODUCT_COUNT_PER_STEP, StoreSlice } from '@src/const';

const initialState: ProductProcess = {
  filterCategory: null,
  filterType: [],
  count: PRODUCT_COUNT_PER_STEP,
};

export const productProcess = createSlice({
  name: StoreSlice.ProductProcess,
  initialState,
  reducers: {
    setCategoryFilter: (state, action: PayloadAction<Product['category']>) => {
      state.filterCategory = state.filterCategory === action.payload ? null : action.payload;
      state.filterType = [];
      state.count = PRODUCT_COUNT_PER_STEP;
    },
    setTypeFilter: (state, action: PayloadAction<Product['type'][]>) => {
      state.filterType = action.payload;
      state.count = PRODUCT_COUNT_PER_STEP;
    },
    incrementCountProducts: (state) => {
      state.count = state.count + PRODUCT_COUNT_PER_STEP;
    },
  },
});

export const { setCategoryFilter, setTypeFilter, incrementCountProducts } = productProcess.actions;
