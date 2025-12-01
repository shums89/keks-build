import { type ChangeEvent, memo, useEffect } from 'react';

import { resetFilters, setCategoryFilter, setTypeFilter } from '@src/store/product-process/product-process';
import { getCategoryFilter, getTypeFilter } from '@src/store/product-process/selectors';
import { useAppDispatch, useAppSelector } from '@src/hooks';

import type { ProductCategory } from '@src/types/product';
import { ProductCategories, ProductTypes } from '@src/const';

const CatalogFilter = () => {
  const dispatch = useAppDispatch();
  const categoryFilter = useAppSelector(getCategoryFilter);
  const typeFilter = useAppSelector(getTypeFilter);

  useEffect(() => () => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleCategoryClick = (category: ProductCategory['name']) => {
    dispatch(setCategoryFilter(category));
  };

  const handleTypeChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt.target.checked) {
      dispatch(setTypeFilter([...typeFilter, evt.target.value]));
    } else {
      dispatch(setTypeFilter(typeFilter.filter((type) => type !== evt.target.value)));
    }
  };

  return (
    <div className="catalog-filter">
      <div className="container">

        <div className="catalog-filter__first-level">
          <h3 className="catalog-filter__title catalog-filter__title--first-level">основы</h3>
          <ul className="catalog-filter__list catalog-filter__list--first-level">
            {
              ProductCategories.map(({name, title}) => (
                <li className="catalog-filter__item catalog-filter__item--first-level" key={name}>
                  <button
                    className={`btn btn--filter-first-level ${categoryFilter === name ? 'is-active' : ''}`}
                    type="button"
                    onClick={() => handleCategoryClick(name)}
                  >
                    {title}
                  </button>
                </li>
              ))
            }
          </ul>
        </div>
        {
          categoryFilter &&
          (
            <div className="catalog-filter__second-level">
              <h3 className="catalog-filter__title catalog-filter__title--second-level">начинки</h3>
              <ul className="catalog-filter__list catalog-filter__list--second-level">
                {
                  ProductCategories.filter(({name}) => name === categoryFilter)[0].types.map((key) => (
                    <li className="catalog-filter__item catalog-filter__item--second-level" key={key}>
                      <div className="custom-toggle custom-toggle--checkbox">
                        <input
                          type="checkbox" value={key} id={`catalog-second-level-id-${key}`} name="catalog-second-level"
                          checked={typeFilter.includes(key)}
                          onChange={handleTypeChange}
                        />
                        <label className="custom-toggle__label" htmlFor={`catalog-second-level-id-${key}`}>{ProductTypes[key]}</label>
                      </div>
                    </li>
                  ))
                }
              </ul>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default memo(CatalogFilter);
