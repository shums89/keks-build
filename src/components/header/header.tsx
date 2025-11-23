import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchFavouritesAction, logoutAction } from '@src/store/api-actions';
import { getFavourites } from '@src/store/product-data/selectors';
import { getAuthorizationStatus } from '@src/store/user-process/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import { AppRoute, AuthorizationStatus } from '@src/const';

const Header = () => {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favourites = useAppSelector(getFavourites);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(fetchFavouritesAction());
    }
  }, [authorizationStatus, dispatch]);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return null;
  }

  return (
    <header className="header header--authorized">
      <div className="container">
        <div className="header__inner">
          <Link to={AppRoute.Root} className="header__logo" aria-label="Переход на главную">
            <img src="img/svg/logo.svg" width="170" height="69" alt="Кондитерская кекс" />
          </Link>
          <div className="header__user-info-wrap">
            <div className="header__user-info">
              <div className="header__user-avatar">
                <picture>
                  <source type="image/webp" srcSet="img/content/user-avatar.webp, img/content/user-avatar@2x.webp 2x" />
                  <img src="img/content/user-avatar.jpg" srcSet="img/content/user-avatar@2x.jpg 2x" width="62" height="62" alt="Аватар пользователя."/>
                </picture>
              </div>
              <p className="header__user-mail">keks@academy.ru</p>
            </div>
          </div>
          <div className="header__buttons">
            {
              authorizationStatus === AuthorizationStatus.Auth && (
                <>
                  <Link to={AppRoute.Favourites} className="header__favourite">
                    <span className="header__favourite-icon">
                      <svg width="33" height="29" aria-hidden="true">
                        <use xlinkHref="#icon-favourite"></use>
                      </svg>
                    </span>
                    <span className="header__favourite-number">{favourites.length}</span>
                    <span className="visually-hidden">Избранное</span>
                  </Link>
                  <div className="header__buttons-authorized">
                    <div className="header__btn">
                      <Link
                        to={AppRoute.Root}
                        className="btn btn--second"
                        onClick={(evt) => {
                          evt.preventDefault();
                          dispatch(logoutAction());
                        }}
                      >
                          Выйти
                      </Link>
                    </div>
                  </div>
                </>
              )
            }
            {
              authorizationStatus === AuthorizationStatus.NoAuth && (
                <>
                  <div className="header__btn">
                    <Link to={AppRoute.Register} className="btn btn--third header__link header__link--reg">Регистрация</Link>
                  </div>
                  <div className="header__btn">
                    <Link to={AppRoute.Login} className="btn">Войти</Link>
                  </div>
                </>
              )
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
