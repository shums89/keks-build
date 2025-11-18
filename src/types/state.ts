import type { Product } from './product';

import type { store } from '@src/store';

export type ProductData = {
  products: Product[];
  isProductsDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
