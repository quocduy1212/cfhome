import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cn from 'classnames';
import { themr } from 'react-css-themr';
import * as statSelectors from 'app-selectors/stats';
import * as gameSelectors from 'app-selectors/game';
import PlayerUtils from 'app-game-player-utils';

import styles from './status-bar.scss';

const StatusBar = ({ className, firstPlayer, secondPlayer, theme, finished }) => {
  const FirstPlayerComp = PlayerUtils.getMarkerComponentFromContent(firstPlayer.marker);
  const SecondPlayerComp = PlayerUtils.getMarkerComponentFromContent(secondPlayer.marker);
  return (
    <header className={cn(className, theme.statusBarContainer)}>
      <section className={cn(theme.floatStatus, 'mr4-ns')}>
        <FirstPlayerComp />
        <span className={theme.score}>{firstPlayer.noOfWins}</span>
        {
          finished &&
            <i className={cn(theme.winIcon, 'material-icons', { 'animated bounce': firstPlayer.win })}>
              {firstPlayer.win ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}
            </i>
        }
      </section>
      <section className={cn(theme.floatStatus, 'mt3 mt0-ns')}>
        <SecondPlayerComp />
        <span className={theme.score}>{secondPlayer.noOfWins}</span>
        {
          finished &&
            <i className={cn(theme.winIcon, 'material-icons', { 'animated bounce': secondPlayer.win })}>
              {secondPlayer.win ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}
            </i>
        }
      </section>
    </header>
  );
};

StatusBar.propTypes = {
  className: PropTypes.string,
  firstPlayer: PropTypes.object.isRequired,
  secondPlayer: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  finished: PropTypes.bool,
};

StatusBar.defaultProps = {
  className: '',
  finished: false,
};

const mapStateToProps = (state) => ({
  firstPlayer: statSelectors.firstPlayerInfo(state),
  secondPlayer: statSelectors.secondPlayerInfo(state),
  finished: gameSelectors.won(state),
});

export default connect(mapStateToProps)(themr('StatusBar', styles)(StatusBar));
