import { Link } from 'react-router-dom';

import type { Product } from '@src/types/product';
import ProductCard from '@components/product-card/product-card';

import { AppRoute } from '@src/const';

type RandomMainProps = {
  products: Product[];
}

const RandomMain = ({products}: RandomMainProps) => (
  <section className="random-main">
    <div className="container">
      <h2 className="random-main__title">кексы</h2>
      <ul className="random-main__list">
        {products.map((product) => (
          <li className="random-main__item" key={product.id}>
            <ProductCard {...product}/>
          </li>
        ))}
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
);

export default RandomMain;
