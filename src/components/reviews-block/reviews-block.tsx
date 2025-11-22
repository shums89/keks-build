import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchReviewsAction } from '@src/store/api-actions';
import { getReviews } from '@src/store/product-data/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import Review from '@components/review/review';
import ReviewsFilterSort from '@components/reviews-filtersort/reviews-filtersort';

import type { SortDateName } from '@src/types/product';
import { Comparator, REVIEW_COUNT_PER_STEP, SortingRating } from '@src/const';

const ReviewBlock = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [countReviews, setCountReviews] = useState(REVIEW_COUNT_PER_STEP);
  const [sortingRating, setSortingRating] = useState(SortingRating[0]);
  const [sortingDate, setSortingDate] = useState<SortDateName>('Increase');
  const reviews = useAppSelector(getReviews);
  const filteredReviews = reviews
    .filter((review) => review.rating >= sortingRating.min && review.rating <= sortingRating.max);

  useEffect(() => {
    const { id } = params;
    if (id) {
      const parsedId = String(id);
      dispatch(fetchReviewsAction(parsedId));
    }
  }, [params, dispatch]);

  return (
    <>
      <ReviewsFilterSort
        sortingRating={sortingRating}
        sortingDate={sortingDate}
        setSortingRating={setSortingRating}
        setSortingDate={setSortingDate}
      />

      <section className="comments">
        <h2 className="visually-hidden">Список комментариев</h2>
        <div className="container">
          <div className="comments__wrapper">
            {
              filteredReviews
                .sort(Comparator[sortingDate])
                .slice(0, countReviews)
                .map((review) => (
                  <Fragment key={review.id}>
                    <Review review={review} />
                  </Fragment>
                ))
            }
          </div>
          {
            countReviews < filteredReviews.length && (
              <div className="comments__show-more">
                <button
                  className="btn btn--second comments__button" type="button"
                  onClick={() => setCountReviews(countReviews + REVIEW_COUNT_PER_STEP)}
                >
                  Показать еще
                </button>
              </div>
            )
          }
        </div>
      </section>
    </>
  );
};

export default ReviewBlock;
