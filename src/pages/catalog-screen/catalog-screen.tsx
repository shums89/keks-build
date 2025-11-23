import { Helmet } from '@dr.pogodin/react-helmet';

import BackLink from '@components/back-link/back-link';
import Catalog from '@components/catalog/catalog';
import CatalogFilter from '@components/catalog-filter/catalog-filter';

const CatalogScreen = () => (
  <>
    <Helmet>
      <title>Кондитерская Кекс - Каталог товаров</title>
    </Helmet>

    <h1 className="visually-hidden">Каталог товаров</h1>

    <BackLink />

    <CatalogFilter />

    <Catalog />
  </>
);

export default CatalogScreen;
