import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './empty.scss';

const Empty = ({ className }) => (
  <div className={cn(styles.markerContainer, className)} />
);

Empty.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
Empty.defaultProps = {
  className: '',
};

export default Empty;
