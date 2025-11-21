import Catalog from '@components/catalog/catalog';
import CatalogFilter from '@components/catalog-filter/catalog-filter';

import browserHistory from '@src/browser-history';

const CatalogScreen = () => (
  <>
    <h1 className="visually-hidden">Каталог товаров</h1>
    <div className="back-link">
      <div className="container">
        <button
          className="back-link__link"
          onClick={() => browserHistory.back()}
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          Назад
          <svg className="back-link__icon" width="30" height="16" aria-hidden="true">
            <use xlinkHref="#icon-arrow-left"></use>
          </svg>
        </button>
      </div>
    </div>

    <CatalogFilter />

    <Catalog />
  </>
);

export default CatalogScreen;
