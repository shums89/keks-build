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

export type ProductCategory = {
  name: 'bisque' | 'cheesecake' | 'shortbread' | 'dessert';
  title: string;
}

export type ProductType = {
  name: 'chocolate' | 'vanilla' | 'vegetarian' | 'honey-cake' | 'lemon' | 'new-york' | 'tart' | 'funnel-cake' | 'basket-cake' | 'chocolate-muffin' | 'brand-muffin';
  title: string;
}

export type ProductReview = {
  id: Product['id'];
  isoDate: string;
  user: Pick<UserData, 'name' | 'avatarUrl'>;
  positive: string;
  negative: string;
  rating: number;
}
