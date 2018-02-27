import React from 'react';
import PropTypes from 'prop-types';
import { themr } from 'react-css-themr';
import cn from 'classnames';
import styles from './o.scss';

const O = ({ className, theme }) => (
  <div className={cn(theme.markerContainer, className)}>
    <div className={theme.markerO} />
  </div>
);
O.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  theme: PropTypes.object.isRequired,
};
O.defaultProps = {
  className: '',
};

export default themr('MarkerO', styles)(O);
