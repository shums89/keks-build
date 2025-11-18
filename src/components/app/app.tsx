import { Route, Routes } from 'react-router-dom';

import Layout from '@layouts/main-layout';

import CatalogScreen from '@pages/catalog-screen/catalog-screen';
import FavouritesScreen from '@pages/favourites-screen/favourites-screen';
import LogInScreen from '@pages/login-screen/login-screen';
import MainScreen from '@pages/main-screen/main-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import ProductScreen from '@pages/product-screen/product-screen';
import SignUpScreen from '@pages/sign-up-screen/sign-up-screen';

import { AppRoute } from '../../const';

const App = () => (
  <Routes>
    <Route path={AppRoute.SignUp} element={<SignUpScreen />} />
    <Route path={AppRoute.LogIn} element={<LogInScreen />} />
    <Route element={<Layout />}>
      <Route index element={<MainScreen />} />
      <Route path={AppRoute.Catalog} element={<CatalogScreen />} />
      <Route path={AppRoute.Product} element={<ProductScreen />} />
      <Route path={AppRoute.Favourites} element={<FavouritesScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Route>
  </Routes>
);

export default App;
