import { clsx } from 'clsx';

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
    className={clsx('loading-skeleton', { 'loading-skeleton--transparent': background })}
    style={{
      width: `${width ? toString(width) : '100%'}`,
      height : `${height ? toString(height) : '100%'}`,
      borderRadius: `${circle ? '50%' : '0.25rem'}`,
    }}
  >
  </span>
);

export default LoadingSkeleton;
