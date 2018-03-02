import React from 'react';
import styles from './loading-ellipsis.scss';

const LoadingEllipsis = ({ className = '', text }) => (
  <div className={`${styles.ellipsisLoading} ${className}`}>{text}</div>
);

export default LoadingEllipsis;
