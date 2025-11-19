import type { Point } from './types/map';

export const BACKEND_URL = 'https://grading.design.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;

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

export const URL_MARKER_DEFAULT = 'img/content/map-marker1.svg';
export const URL_MARKER_CURRENT = 'img/content/map-marker2.svg';

export const Points: Point[] = [
  {
    name: 'Кондитерская 1',
    address: 'Морской пр. 2А',
    location: {
      latitude: 59.971,
      longitude: 30.278,
      zoom: 16,
    },
  },
  {
    name: 'Кондитерская 2',
    address: 'пр. Динамо, 6',
    location: {
      latitude: 59.9708,
      longitude: 30.2808,
      zoom: 16,
    },
  },
  {
    name: 'Производство',
    address: 'ул. Вакуленчука, 4',
    location: {
      latitude: 59.9721,
      longitude: 30.2751,
      zoom: 16,
    },
  },
];
