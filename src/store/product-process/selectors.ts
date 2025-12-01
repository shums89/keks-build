import type { ProductCategory, ProductType } from '@src/types/product';
import type { State } from '@src/types/state';
import { StoreSlice } from '@src/const';

export const getCategoryFilter = (state: State): ProductCategory['name'] | null => state[StoreSlice.ProductProcess].filterCategory;
export const getTypeFilter = (state: State): ProductType['key'][] => state[StoreSlice.ProductProcess].filterType;
export const getCountProducts = (state: State): number => state[StoreSlice.ProductProcess].count;
