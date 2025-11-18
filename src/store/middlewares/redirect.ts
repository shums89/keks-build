import type { Middleware } from 'redux';
import type { PayloadAction } from '@reduxjs/toolkit';

import browserHistory from '../../browser-history';
import { Action } from '../action';
import type { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === Action.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
