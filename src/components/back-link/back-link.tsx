import { memo } from 'react';

import browserHistory from '@src/browser-history';

const BackLink = () => (
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
);

export default memo(BackLink);
