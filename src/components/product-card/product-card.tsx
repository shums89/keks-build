import Skeleton from 'react-loading-skeleton';

import FavoriteButton from '@components/favorite-button/favorite-button';

import type { Product } from '@src/types/product';

import 'react-loading-skeleton/dist/skeleton.css';

type ProductCardProps = {
  product: Product | null;
}

const ProductCard = ({product}: ProductCardProps) => {
  if (!product) {
    return (
      <div className="card-item">
        <div className="card-item__img-link" >
          <Skeleton width={241} height={241} />
        </div>
        <div className="card-item__link">
          <h3 className="card-item__title">
            <Skeleton inline />
          </h3>
        </div>
      </div>
    );
  }

  const {title,previewImage,previewImageWebp,isFavorite,isNew} = product;

  return (
    <div className="card-item">
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
      <a className="card-item__link" href="#">
        <h3 className="card-item__title"><span>{title}</span></h3>
      </a>
    </div>
  );
};

export default ProductCard;
