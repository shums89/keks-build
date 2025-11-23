import type { AuthorizationStatus, SubmitStatus } from '@src/const';
import type { store } from '@src/store';

import type { Product, ProductCategory, ProductReview, ProductType } from './product';
import type { UserData } from './user-data';

export type ProductData = {
  products: Product[];
  isProductsDataLoading: boolean;
  product: Product | null;
  reviews: ProductReview[];
  isReviewsLoadingError: boolean;
  lastReview: ProductReview | null;
  reviewStatus: SubmitStatus;
  favourites: Product[];
  isFavouritesDataLoading: boolean;
};

export type ProductProcess = {
  filterCategory: ProductCategory['name'] | null;
  filterType: ProductType['name'][];
  count: number;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
