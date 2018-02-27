import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from 'react-css-themr';
import * as settingSelectors from 'app-selectors/setting';
import GameLayout from './layout';
import * as themes from '../../themes';

const TicTacToe = ({ currentTheme }) => (
  <ThemeProvider key={currentTheme} theme={themes[currentTheme]}>
    <GameLayout />
  </ThemeProvider>
);

TicTacToe.propTypes = {
  currentTheme: PropTypes.string,
};
TicTacToe.defaultProps = {
  currentTheme: 'default',
};

const mapStateToProps = (state) => ({
  currentTheme: settingSelectors.currentTheme(state),
});

export default connect(mapStateToProps)(TicTacToe);
