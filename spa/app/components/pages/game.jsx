import React from 'react';
import PropTypes from 'prop-types';
import styles from './game.scss';

const Game = ({ children }) => (
  <section className={styles.mainLayout}>
    {children}
  </section>
);
Game.propTypes = {
  children: PropTypes.object,
};
Game.defaultProps = {
  children: null,
};
export default Game;
