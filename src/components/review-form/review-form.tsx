import { type ChangeEvent,type FormEvent,Fragment, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { postReviewAction } from '@src/store/api-actions';
import { getReviewStatus } from '@src/store/product-data/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import type { ProductReview } from '@src/types/product';
import { MAX_REVIEW_LENGTH, SubmitStatus } from '@src/const';
import { declensionOfNouns } from '@src/utils';

type ReviewFormProps = {
  onCloseReviewForm: () => void;
}

export const ReviewForm = ({ onCloseReviewForm }: ReviewFormProps) => {
  const params = useParams();
  const { id } = params;
  const dispatch = useAppDispatch();
  const [rating, setRating] = useState<ProductReview['rating']>(0);

  const [textPositive, setTextPositive] = useState<ProductReview['positive']>('');
  const [textNegative, setTextNegative] = useState<ProductReview['negative']>('');
  const submitStatus = useAppSelector(getReviewStatus);
  const [reviewStatus, setReviewStatus] = useState(SubmitStatus.Still);
  const isSubmiting = submitStatus === SubmitStatus.Pending;

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (reviewStatus === SubmitStatus.Pending && submitStatus === SubmitStatus.Fullfilled) {
      onCloseReviewForm();
    }
  }, [reviewStatus, submitStatus, onCloseReviewForm]);

  const isValidField = (value: string) => {
    switch (value) {
      case 'positive':
        return (textPositive.length > 5 || rating >= 4 && textPositive.length > 5) ? 'is-valid' : 'is-invalid';
      case 'negative':
        return (textNegative.length > 5 || rating > 0 && rating <= 3 && textNegative.length > 5) ? 'is-valid' : 'is-invalid';
      default:
        return '';
    }
  };

  const positiveChangeHandle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.length <= MAX_REVIEW_LENGTH) {
      setTextPositive(target.value);
    }
  };
  const negativeChangeHandle = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value.length <= MAX_REVIEW_LENGTH) {
      setTextNegative(target.value);
    }
  };

  const formSubmitHandle = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setReviewStatus(SubmitStatus.Pending);
    dispatch(postReviewAction({ id: String(id), positive: textPositive, negative: textNegative, rating }));
  };

  return (
    <section className="review-form">
      <div className="container">
        <div className="review-form__wrapper">
          <h2 className="review-form__title">оставить отзыв</h2>
          <div className="review-form__form">
            <form ref={formRef} action="#" method="post" autoComplete="off" onSubmit={formSubmitHandle}>
              <div className="review-form__inputs-wrapper">
                <div className={`custom-input ${isValidField('positive')}`}>
                  <label>
                    <span className="custom-input__label">Достоинства</span>
                    <input
                      type="text" name="advantages" placeholder="Достоинства"
                      onChange={positiveChangeHandle} value={textPositive} disabled={isSubmiting}
                    />
                  </label>
                  {
                    textPositive.length > 0
                      ? <span className="custom-input__message">осталось {MAX_REVIEW_LENGTH - textPositive.length} символов</span>
                      : rating >= 4 && <span className="custom-input__message">заполните поле</span>
                  }
                </div>
                <div className={`custom-input ${isValidField('negative')}`}>
                  <label>
                    <span className="custom-input__label">Недостатки</span>
                    <input
                      type="text" name="disadvantages" placeholder="Недостатки"
                      onChange={negativeChangeHandle} value={textNegative} disabled={isSubmiting}
                    />
                  </label>
                  {
                    textNegative.length > 0
                      ? <span className="custom-input__message">осталось {MAX_REVIEW_LENGTH - textNegative.length} символов</span>
                      : rating > 0 && rating <= 3 && <span className="custom-input__message">заполните поле</span>
                  }
                </div>
              </div>
              <div className="review-form__submit-wrapper">
                <div className="review-form__rating-wrapper">
                  <div className="input-star-rating">
                    {
                      Array.from({ length: 5 }, (_, i) => i + 1)
                        .sort((a, b) => b - a)
                        .map((el) => (
                          <Fragment key={el}>
                            <input type="radio" name="input-star-rating"
                              id={`input-star-rating-${el}`}
                              value={el}
                              aria-label={`${el} ${declensionOfNouns(el, ['звезда', 'звезды', 'звезд'])}`}
                              checked={el === rating}
                              onChange={() => setRating(el)} disabled={isSubmiting}
                            />
                            <label htmlFor={`input-star-rating-${el}`}>
                              <svg width="40" height="40" aria-hidden="true">
                                <use xlinkHref="#icon-star"></use>
                              </svg>
                            </label>
                          </Fragment>
                        ))
                    }
                  </div>
                </div>
                <div className="review-form__button-wrapper">
                  <button className="btn review-form__button" type="submit"
                    disabled={
                      isSubmiting || !rating || rating > 5 ||
                      (rating <= 3 && textNegative.length < 5 || rating >= 4 && textPositive.length < 5)
                    }
                  >
                    Отправить отзыв
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;
