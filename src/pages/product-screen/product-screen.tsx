import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { redirectToRoute } from '@src/store/action';
import { fetchProductAction } from '@src/store/api-actions';
import { getAuthorizationStatus } from '@src/store/user-process/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import BackLink from '@components/back-link/back-link';
import ProductDetails from '@components/product-details/product-details';
import ReviewForm from '@components/review-form/review-form';
import ReviewBlock from '@components/reviews-block/reviews-block';

import { AppRoute, AuthorizationStatus } from '@src/const';

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [isVivsibleReviewForm, setIsVivsibleReviewForm] = useState(false);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    const { id } = params;
    if (id) {
      const parsedId = String(id);
      dispatch(fetchProductAction(parsedId));
    }
  }, [params, dispatch]);

  const handleOpenReviewButtonClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.Login));
      return;
    }

    setIsVivsibleReviewForm(!isVivsibleReviewForm);
  };

  return (
    <>
      <h1 className="visually-hidden">Карточка товара</h1>

      <BackLink />

      <ProductDetails
        isVivsibleReviewForm={isVivsibleReviewForm}
        onClickOpenReview={handleOpenReviewButtonClick}
      />

      { isVivsibleReviewForm && <ReviewForm onCloseReviewForm={handleOpenReviewButtonClick} /> }

      <ReviewBlock />
    </>
  );
};

export default ProductScreen;
