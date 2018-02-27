import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { themr } from 'react-css-themr';
import StatusBar from 'app-comps/status-bar';
import Board from 'app-comps/board';
import styles from './layout.scss';

const GameLayout = ({ theme }) => (
  <main className={theme.gameLayout}>
    <ReactTooltip effect="solid" />
    <StatusBar className="mb3" />
    <Board />
  </main>
);
GameLayout.propTypes = {
  theme: PropTypes.object.isRequired,
};

export default themr('GameLayout', styles)(GameLayout);
