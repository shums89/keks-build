import { useCallback, useEffect } from 'react';

import { fetchProductsAction } from '@src/store/api-actions';
import { getFilteredProducts, getIsProductsLoading, getProducts } from '@src/store/product-data/selectors';
import { incrementCountProducts } from '@src/store/product-process/product-process';
import { getCountProducts } from '@src/store/product-process/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import ProductCard from '@components/product-card/product-card';

import { PRODUCT_COUNT_PER_STEP } from '@src/const';

const Catalog = () => {
  const dispatch = useAppDispatch();
  const isProductsLoading = useAppSelector(getIsProductsLoading);
  const products = useAppSelector(getProducts);
  const filteredProducts = useAppSelector(getFilteredProducts);
  const countProducts = useAppSelector(getCountProducts);
  const isVisibleButton = filteredProducts.length > countProducts;

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const handleShowMoreClick = useCallback(() => {
    dispatch(incrementCountProducts());
  }, [dispatch]);

  if (products.length && !filteredProducts.length) {
    return (
      <section className="not-found">
        <h2 className="visually-hidden">Каталог</h2>
        <div className="container">
          <div className="not-found__content-wrapper">
            <div className="not-found__wrapper">
              <svg width="684" height="423" aria-hidden="true">
                <use xlinkHref="#not-found-cloud"></use>
              </svg>
              <div className="not-found__content">
                <p className="not-found__text">Все выбранные кексы съели.</p>
                <p className="not-found__text">Мы уже печём новые.</p>
              </div>
            </div>
            <div className="not-found__img-wrapper">
              <img src="img/svg/not-found-keks.svg" width="719" height="607" alt="Картика кота." />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const hancdleScrollTopClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <section className="catalog">
      <div className="container">
        <h2 className="visually-hidden">Каталог</h2>
        <div className="catalog__wrapper">
          <ul className="catalog__list">
            {
              !isProductsLoading
                ? filteredProducts.slice(0, countProducts).map((product) => (
                  <li className="catalog__item" key={product.id}>
                    <ProductCard product={product} isBig />
                  </li>))
                : Array.from({ length: PRODUCT_COUNT_PER_STEP }, (_, i) => i + 1).map((e) => (
                  <li key={e} className="random-main__item" >
                    <ProductCard product={null} isBig />
                  </li>))
            }
          </ul>
          {
            !isProductsLoading &&
              <div className="catalog__button-wrapper">
                {
                  isVisibleButton &&
                  <button className="btn btn--second" type="button" onClick={handleShowMoreClick}>Показать еще</button>
                }
                {
                  !isVisibleButton && countProducts > PRODUCT_COUNT_PER_STEP &&
                  <button className="btn btn--second" type="button" onClick={hancdleScrollTopClick}>в начало</button>
                }
              </div>
          }
        </div>
      </div>
    </section>
  );
};

export default Catalog;
