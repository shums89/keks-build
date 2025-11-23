import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';

import Layout from '@src/layouts/main-layout';
import CatalogScreen from '@pages/catalog-screen/catalog-screen';
import ErrorScreen from '@pages/error-screen/error-screen';
import FavouritesScreen from '@pages/favourites-screen/favourites-screen';
import LoginScreen from '@pages/login-screen/login-screen';
import MainScreen from '@pages/main-screen/main-screen';
import NotFoundScreen from '@pages/not-found-screen/not-found-screen';
import ProductScreen from '@pages/product-screen/product-screen';
import RegisterScreen from '@pages/register-screen/register-screen';
import PrivateRoute from '@components/private-route/private-route';

import { AppRoute, AuthorizationStatus } from '@src/const';

const App = () => (
  <HelmetProvider>
    <Routes>
      <Route
        path={AppRoute.Register}
        element={
          <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
            <RegisterScreen />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Login}
        element={
          <PrivateRoute restrictedFor={AuthorizationStatus.Auth} redirectTo={AppRoute.Root}>
            <LoginScreen />
          </PrivateRoute>
        }
      />
      <Route element={<Layout />}>
        <Route index element={<MainScreen />} />
        <Route path={AppRoute.Catalog} element={<CatalogScreen />} />
        <Route path={`${AppRoute.Product}/:id`} element={<ProductScreen />} />
        <Route path={AppRoute.Favourites} element={<FavouritesScreen />} />
        <Route path={AppRoute.Error} element={<ErrorScreen />} />
        <Route path="*" element={<NotFoundScreen />} />
      </Route>
    </Routes>
  </HelmetProvider>
);

export default App;
