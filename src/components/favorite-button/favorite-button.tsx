import { memo } from 'react';

type FavoriteButtonProps = {
  isFavorite: boolean;
};

const FavoriteButton = ({ isFavorite }: FavoriteButtonProps) => (
  <button className={`card-item__favorites ${isFavorite ? 'card-item__favorites--active' : ''}`}>
    <span className="visually-hidden">Добавить в избранное</span>
    <svg width="51" height="41" aria-hidden="true">
      <use xlinkHref="#icon-like"></use>
    </svg>
  </button>
);

export default memo(FavoriteButton, (prevProps, nextProps) => prevProps.isFavorite === nextProps.isFavorite);
