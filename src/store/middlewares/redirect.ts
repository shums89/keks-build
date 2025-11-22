import type { Middleware } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';

import browserHistory from '@src/browser-history';

import { Action } from '../action';
import type { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action: unknown): unknown => {
  if ((action as PayloadAction<string>).type === Action.REDIRECT_TO_ROUTE) {
    browserHistory.push((action as PayloadAction<string>).payload);
  }

  return next(action);
};


