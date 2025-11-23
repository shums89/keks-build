import { memo } from 'react';

import { redirectToRoute } from '@src/store/action';
import { deleteFavoriteStatusAction, putFavoriteStatusAction } from '@src/store/api-actions';
import { getAuthorizationStatus } from '@src/store/user-process/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import type { Product } from '@src/types/product';
import { AppRoute,AuthorizationStatus } from '@src/const';

type FavoriteButtonProps = {
  id: Product['id'];
  isFavorite: boolean;
  isProductCard?: boolean;
};

const FavoriteButton = ({ id, isFavorite, isProductCard }: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleButtonClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    if (isFavorite) {
      dispatch(deleteFavoriteStatusAction(id));
    } else {
      dispatch(putFavoriteStatusAction(id));
    }
  };

  if (isProductCard) {
    return(
      <button
        className={`card-item__favorites ${isFavorite ? 'card-item__favorites--active' : ''}`}
        onClick={handleButtonClick}
      >
        <span className="visually-hidden">Добавить в избранное</span>
        <svg width="51" height="41" aria-hidden="true">
          <use xlinkHref="#icon-like"></use>
        </svg>
      </button>
    );
  }

  return (
    <button
      className={`item-details__like-button ${isFavorite ? 'item-details__like-button--active' : ''}`}
      onClick={handleButtonClick}
    >
      <svg width="45" height="37" aria-hidden="true">
        <use xlinkHref="#icon-like"></use>
      </svg>
      <span className="visually-hidden">Понравилось</span>
    </button>
  );
};

export default memo(FavoriteButton, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite);
