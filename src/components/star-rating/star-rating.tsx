type StarRatingProps = {
  rating: number;
  isBig?: boolean;
  count?: number;
}

const StarRating = ({ rating, isBig, count}: StarRatingProps) => (
  <div className={`star-rating ${isBig ? 'star-rating--big' : ''}`}>
    {
      Array.from({ length: 5 }, (_, i) => i + 1).map((el) => (
        <svg key={el}
          className={`star-rating__star ${el <= rating ? 'star-rating__star--active' : ''}`}
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
