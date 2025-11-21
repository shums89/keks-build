import type { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { Product, ProductReview } from '@src/types/product';
import type { AppDispatch, State } from '@src/types/state';
import type { AuthData, UserData } from '@src/types/user-data';
import browserHistory from '@src/browser-history';
import { APIRoute, AppRoute } from '@src/const';
import { dropToken, saveToken } from '@src/services/token';

import { redirectToRoute } from './action';

const Action = {
  data: {
    FETCH_PRODUCT: 'data/fetchProduct',
    FETCH_PRODUCTS: 'data/fetchProducts',
    FETCH_LAST_REVIEW: 'data/fetchLastReview',
  },
  user: {
    CHECK_AUTH: 'user/checkAuth',
    REGISTER: 'user/register',
    LOGIN: 'user/login',
    LOGOUT: 'user/logout',
  },
} as const;

export const fetchProductAction = createAsyncThunk<
  Product,
  Product['id'],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_PRODUCT, async (id, {dispatch, extra: api }) => {
  try {
    const { data } = await api.get<Product>(`${APIRoute.Prooducts}/${id}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }

    return Promise.reject(error);
  }
});

export const fetchProductsAction = createAsyncThunk<
  Product[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_PRODUCTS, async (_arg, { extra: api }) => {
  const { data } = await api.get<Product[]>(APIRoute.Prooducts);
  return data;
});

export const fetchLastReviewAction = createAsyncThunk<
  ProductReview,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.data.FETCH_LAST_REVIEW, async (_arg, { extra: api }) => {
  const { data } = await api.get<ProductReview>(APIRoute.LastReview);
  return data;
});

export const fetchUserStatusAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.CHECK_AUTH, async (_arg, { extra: api }) => {
  const { data } = await api.get<UserData>(APIRoute.Login);
  return data;
});

export const loginAction = createAsyncThunk<
  UserData,
  Pick<AuthData, 'login' | 'password'>,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.LOGIN, async ({ login: email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, {
    email,
    password,
  });
  const { token } = data;

  saveToken(token);
  browserHistory.back();

  return data;
});

export const registerAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.REGISTER, async ({ name, login: email, password }, {dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Register, {
    name,
    email,
    password,
  });
  const { token } = data;

  saveToken(token);
  dispatch(loginAction({ login: data.email, password }));

  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(Action.user.LOGOUT, async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(redirectToRoute(AppRoute.Root));
});
