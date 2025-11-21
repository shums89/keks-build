import { clsx } from 'clsx';

import LoadingSkeleton from '@components/loading-skeleton/loading-skeleton';
import StarRating from '@components/star-rating/star-rating';

import type { ProductReview } from '@src/types/product';

type ReviewProps = {
  review: ProductReview | null;
};

const getFormattedDate = (date: string) => new Date(date).toLocaleDateString('ru-RU', {
  month: 'numeric',
  day: 'numeric',
});

const Review = ({review}: ReviewProps) => {
  if (!review) {
    return (
      <div className="review">
        <div className="review__inner-wrapper review__inner-wrapper--border">
          <div className="review__date"><LoadingSkeleton width={72} height={10} background/></div>
          <span className="review__author"><LoadingSkeleton width={260} height={30}/></span>
          <div className="star-rating"><LoadingSkeleton width={214} height={30} /></div>
          <div className="review__text-wrapper">
            <p className="review__text"><LoadingSkeleton width={597} height={40} /></p>
            <p className="review__text"><LoadingSkeleton width={597} height={40} /></p>
          </div>
          <div className="review__image-wrapper">
            <LoadingSkeleton width={162} height={162} circle />
          </div>
        </div>
      </div>
    );
  }

  const { isoDate, user, positive, negative, rating } = review;

  return (
    <div className="review">
      <div className="review__inner-wrapper review__inner-wrapper--border">
        <time className="review__date" dateTime={isoDate}>{getFormattedDate(isoDate)}</time>
        <span className="review__author">{user.name}</span>

        <StarRating rating={rating} />

        <div className="review__text-wrapper">
          <p className="review__text">{positive}</p>
          <p className="review__text">{negative}</p>
        </div>
        <div className="review__image-wrapper">
          <img src={user.avatarUrl} width="162" height="162" alt={user.name} />
        </div>
      </div>
    </div>
  );
};

export default Review;
