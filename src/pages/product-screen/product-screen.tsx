import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { fetchProductAction } from '@src/store/api-actions';
import { useAppDispatch } from '@src/hooks';

import BackLink from '@components/back-link/back-link';
import ProductDetails from '@components/product-details/product-details';
import ReviewForm from '@components/review-form/review-form';

const ProductScreen = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const [isVivsibleReviewForm, setIsVivsibleReviewForm] = useState(false);

  useEffect(() => {
    const { id } = params;
    if (id) {
      const parsedId = String(id);
      dispatch(fetchProductAction(parsedId));
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
    </>
  );
};

export default ProductScreen;
