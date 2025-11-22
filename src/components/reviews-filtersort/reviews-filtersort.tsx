import type { SortDateName, SortRatingName } from '@src/types/product';
import { SortingRating } from '@src/const';

type ReviewsFilterSortProps = {
  sortingRating: SortRatingName;
  sortingDate: SortDateName;
  setSortingRating: (value: SortRatingName) => void;
  setSortingDate: (value: SortDateName) => void;
}

const ReviewsFilterSort = ({ setSortingRating, setSortingDate, sortingRating, sortingDate }: ReviewsFilterSortProps) => (
  <div className="filter-sort">
    <div className="container">
      <div className="filter-sort__inner">
        <div className="filter-sort__filter-wrap">
          <h3 className="filter-sort__filter-title">Показать с рейтингом</h3>
          <div className="filter-sort__filter">
            <button className="filter-sort__filter-btn" type="button">
              {sortingRating.title}
              <svg className="filter-sort__filter-icon" width="14" height="15" aria-hidden="true">
                <use xlinkHref="#icon-polygon"></use>
              </svg>
            </button>
            <ul className="filter-sort__filter-list">
              {
                SortingRating.map((element) => (
                  <li className="filter-sort__filter-item" key={element.id}>
                    <div className="custom-toggle custom-toggle--sorting">
                      <input
                        type="radio" id={`review-sort-${element.id}`} name="review-sort"
                        checked={element.id === sortingRating.id}
                        onChange={() => setSortingRating(element)}
                      />
                      <label className="custom-toggle__label" htmlFor={`review-sort-${element.id}`}>
                        {element.title}
                      </label>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
        <div className="filter-sort__sort-wrap">
          <h3 className="filter-sort__sort-title">Сортировать по дате</h3>
          <div className="filter-sort__sort-btns-wrap">
            <button
              className={`filter-sort__sort-btn filter-sort__sort-btn--inc 
                    ${sortingDate === 'Increase' ? 'filter-sort__sort-btn--active' : ''}`}
              type="button" aria-label="сортировка по возрастанию"
              onClick={() => setSortingDate('Increase')}
            >
              <svg className="filter-sort__sort-icon" width="19" height="13" aria-hidden="true">
                <use xlinkHref="#icon-chevron-top"></use>
              </svg>
            </button>
            <button
              className={`filter-sort__sort-btn filter-sort__sort-btn--desc
                     ${sortingDate === 'Decrease' ? 'filter-sort__sort-btn--active' : ''}`}
              type="button" aria-label="сортировка по убыванию"
              onClick={() => setSortingDate('Decrease')}
            >
              <svg className="filter-sort__sort-icon" width="19" height="13" aria-hidden="true">
                <use xlinkHref="#icon-chevron-top"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReviewsFilterSort;
