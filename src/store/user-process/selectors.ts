import { AuthorizationStatus, StoreSlice } from '../../const';
import type { State } from '../../types/state';
import type { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[StoreSlice.UserProcess].authorizationStatus;

export const getUser = (state: State): UserData | null => state[StoreSlice.UserProcess].user;
