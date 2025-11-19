import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchLastReviewAction, fetchProductsAction } from '@src/store/api-actions';
import { getIsProductsLoading, getLastReview, selectRandomProducts } from '@src/store/product-data/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import Map from '@components/map/map';
import ProductCard from '@components/product-card/product-card';
import Review from '@components/review/review';

import { AppRoute } from '@src/const';

const MainScreen = () => {
  const dispatch = useAppDispatch();
  const isProductsDataLoading = useAppSelector(getIsProductsLoading);
  const products = useAppSelector(selectRandomProducts);
  const review = useAppSelector(getLastReview);

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchLastReviewAction());
  }, [dispatch]);

  return (
    <>
      <div className="hero">
        <div className="container">
          <div className="hero__img-wrapper">
            <img className="hero__img" src="img/svg/hero-keks.svg" width="727" height="569" alt="Картика кота." />
          </div>
          <div className="hero__wrapper">
            <p className="hero__subtitle">Твоя пушистая кондитерская</p>
            <p className="hero__title">КЕКС</p>
            <div className="hero__button-wrapper">
              <Link to={AppRoute.Catalog} className="btn">Скорее смотреть</Link>
            </div>
          </div>
        </div>
      </div>

      <section className="random-main">
        <div className="container">
          <h2 className="random-main__title">кексы</h2>
          <ul className="random-main__list">
            {
              !isProductsDataLoading
                ? products.map((product) => (
                  <li key={product.id} className="random-main__item" >
                    <ProductCard product={ product}/>
                  </li>))
                : Array.from({ length: 3 }, (_, i) => i + 1).map((e) => (
                  <li key={e} className="random-main__item" >
                    <ProductCard product={null} />
                  </li>))
            }
            <li className="random-main__item">
              <Link to={AppRoute.Catalog} className="random-main__link">
                <div className="random-main__icon-wrapper">
                  <div className="random-main__icon">
                    <svg width="120" height="130" aria-hidden="true">
                      <use xlinkHref="#icon-keks"></use>
                    </svg>
                  </div>
                </div>
                <h3 className="random-main__subtitle">Все кексы</h3>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="last-review">
        <div className="container">
          <h2 className="last-review__title">последний отзыв</h2>
          {<Review review={review}/>}
        </div>
      </section>

      <Map />
    </>
  );
};

export default MainScreen;
