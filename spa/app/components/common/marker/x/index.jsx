import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cn from 'classnames';
import styles from './x.scss';

const X = ({ className, theme }) => (
  <div className={cn(theme.markerContainer, className)}>
    <div className={theme.markerX} />
  </div>
);
X.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  theme: PropTypes.object.isRequired,
};
X.defaultProps = {
  className: '',
};

export default themr('MarkerX', styles)(X);
