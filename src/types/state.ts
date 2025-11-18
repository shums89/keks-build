import type { store } from '@src/store';

import type { Product } from './product';

export type ProductData = {
  products: Product[];
  isProductsDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
