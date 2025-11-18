import type { store } from '@src/store';

import type { Product, ProductReview } from './product';

export type ProductData = {
  products: Product[];
  isProductsDataLoading: boolean;
  lastReview: ProductReview | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
