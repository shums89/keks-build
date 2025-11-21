import type { IconName, MapMarker, Point } from './types/map';
import type { ProductCategory, ProductType } from './types/product';

export const PRODUCT_COUNT_PER_STEP = 6;

export const BACKEND_URL = 'https://grading.design.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;

export const INVALID_NAME_MESSAGE = 'Имя должно включать минимум одну букву';
export const VALID_NAME_REGEX = /^(?=.*[a-zA-Z])([a-zA-Z]+)$/;

export const INVALID_LOGIN_MESSAGE = 'Пожалуйста, введите действительный адрес электронной почты';

export const INVALID_PASSWORD_MESSAGE = 'Пароль должен содержать хотя бы одну букву и цифру, без пробелов';
export const VALID_PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Product = '/product',
  Login = '/login',
  Register = '/register',
  Favourites = '/favourites',
  Error = '/error',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Prooducts = '/v0/keks/products',
  Categories = '/v0/keks/categories',
  Favourites = '/v0/keks/favourites',
  Reviews = '/v0/keks/reviews',
  LastReview = '/v0/keks/reviews/getLast',
  Register = '/v0/keks/users/registration',
  UserAvatar = '/v0/keks/users/upload',
  Login = '/v0/keks/users/login',
  Logout = '/v0/keks/users/logout',
}

export enum StoreSlice {
  ProductData = 'PRODUCT_DATA',
  ProductProcess = 'PRODUCT_PROCESS',
  UserProcess = 'USER_PROCESS',
}

export const IconNames = ['production', 'confectionery'] as const;

export const MapMarkers: { [key in IconName]: MapMarker } = {
  production: {
    iconUrl: 'img/content/map-marker1.svg',
    iconSize: [26, 24],
    iconAnchor: [13, 12],
  },
  confectionery: {
    iconUrl: 'img/content/map-marker2.svg',
    iconSize: [26, 24],
    iconAnchor: [13, 12],
  },
};

export const Points: Point[] = [
  {
    name: 'Кондитерская 1',
    address: 'ул. Профессора Попова, 9А',
    mapMarker: 'confectionery',
    location: {
      latitude: 59.970969,
      longitude: 30.316252,
      zoom: 15,
    },
  },
  {
    name: 'Кондитерская 2',
    address: 'ул. Вязовая, 13',
    mapMarker: 'confectionery',
    location: {
      latitude: 59.967947,
      longitude: 30.274708,
      zoom: 15,
    },
  },
  {
    name: 'Производство',
    address: 'ул. Малая Пушкарская, 36',
    mapMarker: 'production',
    location: {
      latitude: 59.960380,
      longitude: 30.308725,
      zoom: 15,
    },
  },
];

export const ProductCategories: ProductCategory[] = [
  { name: 'bisque', title: 'Бисквит', },
  { name: 'dessert', title: 'Десерт', },
  { name: 'cheesecake', title: 'Чизкейк', },
  { name: 'shortbread', title: 'Песочное', }
];

export const ProductTypes: ProductType[] = [
  { name: 'chocolate', title: 'Шоколадный', },
  { name: 'vanilla', title: 'Ванильный', },
  { name: 'vegetarian', title: 'Вегетарианский', },
  { name: 'honey-cake', title: 'Медовый торт', },
  { name: 'lemon', title: 'Лимонный', },
  { name: 'new-york', title: 'Нью-Йорк', },
  { name: 'tart', title: 'Тарт', },
  { name: 'funnel-cake', title: 'Торт "Воронка"', },
  { name: 'basket-cake', title: 'Торт "Корзинка"', },
  { name: 'chocolate-muffin', title: 'Шоколадный маффин', },
  { name: 'brand-muffin', title: 'Фирменный маффин', },

];
