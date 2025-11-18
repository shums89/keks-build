export type Product ={
  id: string;
  title: string;
  category: ProductCategory;
  type: ProductType;
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

export type ProductCategory = 'bisque' | 'cheesecake' | 'shortbread' | 'dessert'

export type ProductType =
  'chocolate'
  | 'vanilla'
  | 'vegetarian'
  | 'honey-cake'
  | 'lemon'
  | 'new-york'
  | 'tart'
  | 'funnel-cake'
  | 'basket-cake'
  | 'chocolate-muffin'
  | 'brand-muffin';
