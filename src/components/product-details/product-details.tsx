import { useState } from 'react';

import { getProduct } from '@src/store/product-data/selectors';
import { useAppSelector } from '@src/hooks';

import LoadingSkeleton from '@components/loading-skeleton/loading-skeleton';
import StarRating from '@components/star-rating/star-rating';

type ProductDetailsProps = {
  isVivsibleReviewForm: boolean;
  onClickOpenReview: () => void;
}

export const ProductDetails = ({ isVivsibleReviewForm, onClickOpenReview }: ProductDetailsProps) => {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const product = useAppSelector(getProduct);
  const DESCRIPTION_MAX_LENGTH = 140;

  if (!product) {
    return (
      <section className={`item-details ${isVivsibleReviewForm ? 'item-details--form-open' : ''}`}>
        <div className="container">
          <div className="item-details__wrapper">
            <div className="item-details__top-wrapper">
              <h2 className="item-details__name"><LoadingSkeleton width={400} height={40} /></h2>
              <span className="item-details__price"><LoadingSkeleton width={135} height={40} /></span>
            </div>
            <div className="item-details__weight-wrapper">
              <span className="item-details__weight"><LoadingSkeleton width={158} height={30} /></span>
            </div>
            <div className="item-details__bottom-wrapper">
              <LoadingSkeleton width={400} height={410} />
              <div className="item-details__review-wrapper">
                <LoadingSkeleton width={300} height={40} />

                <div className="item-details__text-wrapper">
                  <LoadingSkeleton width={600} height={110} />
                </div>

                <div className="item-details__button-wrapper">
                  <LoadingSkeleton width={43} height={34} />
                  <button className="btn btn--second" type="button">
                    <LoadingSkeleton width={280} height={30} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { title, price, previewImage, previewImageWebp, isFavorite, isNew, description, weight, rating, reviewCount } = product;

  return (
    <section className={`item-details ${isVivsibleReviewForm ? 'item-details--form-open' : ''}`}>
      <div className="container">
        <div className="item-details__wrapper">
          <div className="item-details__top-wrapper">
            <h2 className="item-details__name">{title}</h2>
            <span className="item-details__price">{`${price} р`}</span>
          </div>
          <div className="item-details__weight-wrapper">
            <span className="item-details__weight">{`${weight} грамм`}</span>
          </div>
          <div className="item-details__bottom-wrapper">
            <div className="item-details__image-wrapper">
              <picture>
                <source type="image/webp" srcSet={previewImageWebp} />
                <img src={previewImage} width="241" height="245" alt={title} />
              </picture>
              { isNew && (<span className="item-details__label">Новинка</span>)}
            </div>
            <div className="item-details__review-wrapper">

              <StarRating rating={Math.round(rating)} isBig count={reviewCount} />

              <div className="item-details__text-wrapper">
                <span className="item-details__text">
                  {
                    isDescriptionOpen ? description : description.slice(0, DESCRIPTION_MAX_LENGTH)
                  }
                </span>
                {
                  !isDescriptionOpen && description.length > DESCRIPTION_MAX_LENGTH
                    ? (
                      <button className="item-details__more" onClick={() => setIsDescriptionOpen(true)}>
                        <span className="visually-hidden">Читать полностью</span>
                        <svg width="27" height="17" aria-hidden="true">
                          <use xlinkHref="#icon-more"></use>
                        </svg>
                      </button>
                    )
                    : null
                }
              </div>

              <div className="item-details__button-wrapper">
                <button className={`item-details__like-button ${isFavorite ? 'item-details__like-button--active' : ''}`}>
                  <svg width="45" height="37" aria-hidden="true">
                    <use xlinkHref="#icon-like"></use>
                  </svg>
                  <span className="visually-hidden">Понравилось</span>
                </button>

                <button className="btn btn--second" type="button" onClick={() => onClickOpenReview()}>
                  {
                    isVivsibleReviewForm ? 'Отменить отзыв' : 'Оставить отзыв'
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
