import { memo } from 'react';
import { Link } from 'react-router-dom';

import FavoriteButton from '@components/favorite-button/favorite-button';
import LoadingSkeleton from '@components/loading-skeleton/loading-skeleton';

import type { Product } from '@src/types/product';
import { AppRoute } from '@src/const';
import { divideNumberByPieces } from '@src/utils';

type ProductCardProps = {
  product: Product | null;
  isBig?: boolean;
}

const ProductCard = ({product, isBig}: ProductCardProps) => {
  if (!product) {
    return (
      <div className={`card-item ${isBig ? 'card-item--big' : ''}`}>
        <div className="card-item__img-link" >
          <LoadingSkeleton width={isBig ? 327 : 241} height={ isBig ? 332 : 245} />
        </div>
        {
          isBig
            ? <span className="card-item__price"><LoadingSkeleton height={50} /></span>
            : null
        }
        <div className="card-item__link">
          <h3 className="card-item__title">
            <LoadingSkeleton height={isBig ? 80 : 30} />
          </h3>
        </div>
      </div>
    );
  }

  const {title,previewImage,previewImageWebp,isFavorite,isNew} = product;

  return (
    <div className={`card-item ${isBig ? 'card-item--big' : ''}`}>
      <Link to={`${AppRoute.Product}/${product.id}`} className="card-item__img-link">
        <div className="card-item__img-wrapper">
          <picture>
            <source type="image/webp" srcSet={previewImageWebp} />
            <img loading="lazy" src={previewImage} width="241" height="245" alt={title} />
          </picture>
        </div>
        {isNew ? <span className="card-item__label">Новинка</span> : null}
      </Link>

      <FavoriteButton id={product.id} isFavorite={isFavorite} isProductCard />

      {isBig ? <span className="card-item__price">{divideNumberByPieces(product.price)}</span> : null}

      <Link to={`${AppRoute.Product}/${product.id}`} className="card-item__link">
        <h3 className="card-item__title"><span>{title}</span></h3>
      </Link>
    </div>
  );
};

export default memo(ProductCard);
