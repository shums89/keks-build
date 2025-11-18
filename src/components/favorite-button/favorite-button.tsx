import { clsx } from 'clsx';

type FavoriteButtonProps = {
  isFavorite: boolean;
};

const FavoriteButton = ({ isFavorite }: FavoriteButtonProps) => (
  <button className={clsx('card-item__favorites', { 'card-item__favorites--active': isFavorite })}>
    <span className="visually-hidden">Добавить в избранное</span>
    <svg width="51" height="41" aria-hidden="true">
      <use xlinkHref="#icon-like"></use>
    </svg>
  </button>
);

export default FavoriteButton;
