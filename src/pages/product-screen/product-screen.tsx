import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProductAction, fetchReviewsAction } from '@src/store/api-actions';
import { getReviews } from '@src/store/product-data/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import BackLink from '@components/back-link/back-link';
import ProductDetails from '@components/product-details/product-details';
import Review from '@components/review/review';
import ReviewForm from '@components/review-form/review-form';

import type { SortDateName } from '@src/types/product';
import { Comparator, REVIEW_COUNT_PER_STEP, SortingRating } from '@src/const';

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [isVivsibleReviewForm, setIsVivsibleReviewForm] = useState(false);
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
      dispatch(fetchProductAction(parsedId));
      dispatch(fetchReviewsAction(parsedId));
    }
  }, [params, dispatch]);

  return (
    <>
      <h1 className="visually-hidden">Карточка товара</h1>

      <BackLink />

      <ProductDetails
        isVivsibleReviewForm={isVivsibleReviewForm}
        onClickOpenReview={() => setIsVivsibleReviewForm(!isVivsibleReviewForm)}
      />

      {
        isVivsibleReviewForm && <ReviewForm />
      }

      <div className="filter-sort">
        <div className="container">
          <div className="filter-sort__inner">
            <div className="filter-sort__filter-wrap">
              <h3 className="filter-sort__filter-title">Показать с рейтингом</h3>
              <div className="filter-sort__filter">
                <button className="filter-sort__filter-btn" type="button">
                  {sortingRating.title}
                  <svg className="filter-sort__filter-icon" width="14" height="15" aria-hidden="true">
                    <use xlinkHref="#icon-polygon"></use>
                  </svg>
                </button>
                <ul className="filter-sort__filter-list">
                  {
                    SortingRating.map((element) => (
                      <li className="filter-sort__filter-item" key={element.id}>
                        <div className="custom-toggle custom-toggle--sorting">
                          <input
                            type="radio" id={`review-sort-${element.id}`} name="review-sort"
                            checked={element.id === sortingRating.id}
                            onChange={() => setSortingRating(element)}
                          />
                          <label className="custom-toggle__label" htmlFor={`review-sort-${element.id}`}>
                            {element.title}
                          </label>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            <div className="filter-sort__sort-wrap">
              <h3 className="filter-sort__sort-title">Сортировать по дате</h3>
              <div className="filter-sort__sort-btns-wrap">
                <button
                  className={`filter-sort__sort-btn filter-sort__sort-btn--inc 
                    ${sortingDate === 'Increase' ? 'filter-sort__sort-btn--active' : ''}`}
                  type="button" aria-label="сортировка по возрастанию"
                  onClick={() => setSortingDate('Increase')}
                >
                  <svg className="filter-sort__sort-icon" width="19" height="13" aria-hidden="true">
                    <use xlinkHref="#icon-chevron-top"></use>
                  </svg>
                </button>
                <button
                  className={`filter-sort__sort-btn filter-sort__sort-btn--desc
                     ${sortingDate === 'Decrease' ? 'filter-sort__sort-btn--active' : ''}`}
                  type="button" aria-label="сортировка по убыванию"
                  onClick={() => setSortingDate('Decrease')}
                >
                  <svg className="filter-sort__sort-icon" width="19" height="13" aria-hidden="true">
                    <use xlinkHref="#icon-chevron-top"></use>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default ProductScreen;
