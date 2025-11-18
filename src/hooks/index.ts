import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, State } from '@src/types/state';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
