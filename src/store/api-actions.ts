import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Product } from '../types/product';
import type { AppDispatch, State } from '../types/state';

import { APIRoute } from '../const';

const Action = {
  data: {
    FETCH_PRODUCTS: 'data/fetchProducts',
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
