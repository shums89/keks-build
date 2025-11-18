export const BACKEND_URL = 'https://grading.design.htmlacademy.pro';
export const REQUEST_TIMEOUT = 5000;

export enum AppRoute {
  Root = '/',
  Catalog = '/Catalog',
  Product = '/Product',
  LogIn = '/LogIn',
  SignUp = '/SignUp',
  Favourites = '/Favourites',
  Error = '/Error',
  NotFound = '/404',
}

export enum APIRoute {
  Prooducts = '/v0/keks/products',
  Categories = '/v0/keks/categories',
  Favourites = '/v0/keks/favourites',
  Reviews = '/v0/keks/reviews',
  LastReview = '/v0/keks/reviews/getLast',
  SignUp = '/v0/keks/users/registration',
  UserAvatar = '/v0/keks/users/upload',
  Login = '/v0/keks/users/login',
  Logout = '/v0/keks/users/logout',
}

export enum StoreSlice {
  ProductData = 'PRODUCT_DATA',
  ProductProcess = 'PRODUCT_PROCESS',
  UserProcess = 'USER_PROCESS',
}
