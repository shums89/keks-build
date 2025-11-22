import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchReviewsAction } from '@src/store/api-actions';
import { getIsReviewsLoadingError, getReviews } from '@src/store/product-data/selectors';
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
  const isReviewsLoadingError = useAppSelector(getIsReviewsLoadingError);
  const filteredReviews = reviews
    .filter((review) => review.rating >= sortingRating.min && review.rating <= sortingRating.max);

  useEffect(() => {
    const { id } = params;
    if (id) {
      dispatch(fetchReviewsAction(String(id)));
    }
  }, [params, dispatch]);

  const handleResetButtonClick = () => setSortingRating(SortingRating[0]);

  const handleErrorButtonClick = () => {
    const { id } = params;
    if (id) {
      dispatch(fetchReviewsAction(String(id)));
    }
  };

  if (isReviewsLoadingError) {
    return (
      <section className="error-comments">
        <div className="container">
          <div className="error-comments__wrapper">
            <h2 className="error-comments__title">Не удалось загрузить комментарии</h2>
            <button className="btn error-comments__button" type="button" onClick={handleErrorButtonClick}>
              Попробовать ещё
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="empty-results">
        <div className="container">
          <div className="empty-results__wrapper">
            <h2 className="empty-results__title">Про этот кекс нам ничего не&nbsp;рассказали. Вы&nbsp;можете оставить свой отзыв первым.</h2>
            <svg width="180" height="166" aria-hidden="true">
              <use xlinkHref="#icon-cake"></use>
            </svg>
          </div>
        </div>
      </section>
    );
  }

  if (filteredReviews.length === 0) {
    return (
      <section className="empty-results empty-results--has-sort">
        <div className="container">
          <div className="empty-results__wrapper">
            <h2 className="empty-results__title">По вашему запросу информации не найдено</h2>
            <button className="btn btn--second empty-results__button" type="button" onClick={handleResetButtonClick}>
              Сбросить фильтры
            </button>
            <svg width="180" height="166" aria-hidden="true">
              <use xlinkHref="#icon-cake"></use>
            </svg>
          </div>
        </div>
      </section>
    );
  }

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
