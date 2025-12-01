import type { SortingDate, SortingRating } from '@src/const';

import type { UserData } from './user-data';

export type SortDateName = keyof typeof SortingDate;
export type SortRatingName = typeof SortingRating[number];

export type Product ={
  id: string;
  title: string;
  category: ProductCategory['name'];
  type: ProductType['name'];
  price: number;
  previewImage: string;
  previewImageWebp: string;
  isFavorite: boolean;
  isNew: boolean;
  description: string;
  images: [string];
  weight: number;
  rating: number;
  reviewCount: number;
}

export type ProductType = {
  [key: string]: string;
}

export type ProductCategory = {
    name: string;
    title: string;
    types: ProductType['key'][];
  };


export type ProductReview = {
  id: Product['id'];
  isoDate: string;
  user: Pick<UserData, 'name' | 'avatarUrl'>;
  positive: string;
  negative: string;
  rating: number;
}

export type ProductReviewAuth = Pick<ProductReview, 'positive' | 'negative' | 'rating'> & Pick<Product, 'id'>;
