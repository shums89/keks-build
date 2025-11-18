import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Product, ProductReview } from '@src/types/product';
import type { AppDispatch, State } from '@src/types/state';
import { APIRoute } from '@src/const';

const Action = {
  data: {
    FETCH_PRODUCTS: 'data/fetchProducts',
    FETCH_LAST_REVIEW: 'data/fetchLastReview',
  },
} as const;

export const fetchProductsAction = createAsyncThunk<
  Product[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_PRODUCTS, async (_arg, { extra: api }) => {
  const { data } = await api.get<Product[]>(APIRoute.Prooducts);
  return data;
});

export const fetchLastReviewAction = createAsyncThunk<
  ProductReview,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_LAST_REVIEW, async (_arg, { extra: api }) => {
  const { data } = await api.get<ProductReview>(APIRoute.LastReview);
  return data;
});
