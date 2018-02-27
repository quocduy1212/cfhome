import { createSelector } from 'reselect';
import PlayerUtils from 'app-game-player-utils';
import { firstPlayerWin, secondPlayerWin } from './game';

const noOfWinsFirstPlayer = state => state.stats.firstPlayerWin;
const noOfWinsSecondPlayer = state => state.stats.secondPlayerWin;

export const firstPlayerInfo = createSelector(
  noOfWinsFirstPlayer,
  firstPlayerWin,
  (noOfWins, win) => ({
    marker: PlayerUtils.getFirstPlayerMarker(),
    noOfWins,
    win,
  }),
);

export const secondPlayerInfo = createSelector(
  noOfWinsSecondPlayer,
  secondPlayerWin,
  (noOfWins, win) => ({
    marker: PlayerUtils.getSecondPlayerMarker(),
    noOfWins,
    win,
  }),
);
