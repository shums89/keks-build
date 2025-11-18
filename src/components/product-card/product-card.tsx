import FavoriteButton from '@components/favorite-button/favorite-button';

import type { Product } from '@src/types/product';

type ProductCardProps = Product;

const ProductCard = ({title,previewImage,previewImageWebp,isFavorite,isNew}:ProductCardProps) => (
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

export default ProductCard;
