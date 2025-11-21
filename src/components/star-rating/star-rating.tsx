import { clsx } from 'clsx';

type StarRatingProps = {
  rating: number;
  isBig?: boolean;
  count?: number;
}

const StarRating = ({ rating, isBig, count}: StarRatingProps) => (
  <div className={clsx('star-rating', {'star-rating--big': isBig})}>
    {
      Array.from({ length: 5 }, (_, i) => i + 1).map((el) => (
        <svg key={el}
          className={clsx('star-rating__star', { 'star-rating__star--active': el <= rating })}
          width="30" height="30" aria-hidden="true"
        >
          <use xlinkHref="#icon-star"></use>
        </svg>
      ))
    }
    { count && (<span className="star-rating__count">{count}</span>)}
  </div>
);

export default StarRating;
