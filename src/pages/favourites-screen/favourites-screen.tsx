import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from '@dr.pogodin/react-helmet';

import { deleteFavoriteStatusAction, fetchFavouritesAction } from '@src/store/api-actions';
import { getFavourites, getIsFavouritesLoading } from '@src/store/product-data/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import BackLink from '@components/back-link/back-link';
import Loader from '@components/loader/loader';
import ProductCard from '@components/product-card/product-card';

import { AppRoute } from '@src/const';
import { declensionOfNouns, divideNumberByPieces } from '@src/utils';

const FavouritesScreen = () => {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(getFavourites);
  const isFavouritesLoading = useAppSelector(getIsFavouritesLoading);

  useEffect(() => {
    dispatch(fetchFavouritesAction());
  }, [dispatch]);

  const handleClearButtonClick = () => {
    favourites.map(({ id }) => dispatch(deleteFavoriteStatusAction(id)));
  };

  if (isFavouritesLoading) {
    return <Loader />;
  }

  if (!favourites.length) {
    return (
      <>
        <Helmet>
          <title>Кондитерская Кекс - Избранные товары</title>
        </Helmet>

        <section className="empty-favorites">
          <h2 className="visually-hidden">Избранные товары</h2>
          <div className="container">
            <div className="empty-favorites__bg-wrapper">
              <div className="empty-favorites__wrapper">
                <svg width="944" height="707" aria-hidden="true">
                  <use xlinkHref="#icon-empty-favorites-cloud"></use>
                </svg>
                <div className="empty-favorites__content">
                  <p className="empty-favorites__text">Кажется, пока вы не добавили ни одного кекса</p>
                  <div className="empty-favorites__button-wrapper">
                    <Link to={AppRoute.Catalog} className="btn">К кексам</Link>
                  </div>
                </div>
              </div>
              <div className="empty-favorites__img-wrapper">
                <img src="img/svg/bg-keks-empty-favorites.svg" width="680" height="687" alt="Картика кота." />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Кондитерская Кекс - Избранное</title>
      </Helmet>

      <div className="favorites-page">
        <h1 className="visually-hidden">Избранное</h1>

        <BackLink />

        <section className="number-of-favourites favorites-page__qty">
          <div className="container">
            <h2 className="visually-hidden">Количество товаров в избранном.</h2>
            <p className="number-of-favourites__cakes">
              {`${favourites.length} ${declensionOfNouns(favourites.length, ['кекс', 'кекса', 'кексов'])}`}
            </p>
            <div className="number-of-favourites__wrapper">
              <div className="number-of-favourites__wrap-price">
                <p className="number-of-favourites__text">Всего</p>
                <p className="number-of-favourites__price">
                  {`${divideNumberByPieces(favourites.reduce((acc, product) => acc + product.price, 0))} р`}
                </p>
              </div>
            </div>
            <div className="number-of-favourites__button">
              <Link to={AppRoute.Catalog} className="btn">В каталог</Link>
            </div>
          </div>
        </section>

        <section className="favourites">
          <div className="container">
            <h2 className="visually-hidden">Избранные товары</h2>
            <div className="favourites__button">
              <button className="btn btn--second" type="button" onClick={handleClearButtonClick}>Очистить</button>
            </div>
          </div>

          <section className="catalog">
            <div className="container">
              <h2 className="visually-hidden">Каталог</h2>
              <div className="catalog__wrapper">
                <ul className="catalog__list">
                  {
                    favourites.map((product) => (
                      <li className="catalog__item" key={product.id}>
                        <ProductCard product={product} isBig />
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default FavouritesScreen;
