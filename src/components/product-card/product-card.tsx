import { clsx } from 'clsx';

import FavoriteButton from '@components/favorite-button/favorite-button';
import LoadingSkeleton from '@components/loading-skeleton/loading-skeleton';

import type { Product } from '@src/types/product';

type ProductCardProps = {
  product: Product | null;
  isBig?: boolean;
}

const ProductCard = ({product, isBig}: ProductCardProps) => {
  if (!product) {
    return (
      <div className={clsx('card-item', {'card-item--big': isBig})}>
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
    <div className={clsx('card-item', {'card-item--big': isBig})}>
      <a className="card-item__img-link" href="#">
        <div className="card-item__img-wrapper">
          <picture>
            <source type="image/webp" srcSet={previewImageWebp} />
            <img src={previewImage} width="241" height="245" alt={title} />
          </picture>
        </div>
        {isNew ? <span className="card-item__label">Новинка</span> : null}
      </a>

      <FavoriteButton isFavorite={isFavorite} />

      {isBig ? <span className="card-item__price">4 100 p</span> : null}

      <a className="card-item__link" href="#">
        <h3 className="card-item__title"><span>{title}</span></h3>
      </a>
    </div>
  );
};

export default ProductCard;
