import { memo } from 'react';

import './loading-skeleton.css';

type LoadingSkeletonProps = {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  background?: boolean;
}

const toString = (value: string | number) => (typeof value === 'number' ? `${value}px` : value);

const LoadingSkeleton = ({width, height, circle = false, background = false}: LoadingSkeletonProps) => (
  <span
    className={`loading-skeleton ${background ? 'loading-skeleton--background' : ''}`}
    style={{
      width: `${width ? toString(width) : '100%'}`,
      height : `${height ? toString(height) : '100%'}`,
      borderRadius: `${circle ? '50%' : '0.25rem'}`,
    }}
  >
  </span>
);

export default memo(LoadingSkeleton);
