import PlayerUtils from 'app-game-player-utils';
import { setting } from 'app-selectors/setting';
import { endGameSequence } from 'app-game/tictactoe';
import {
  PLACE_MARKER,
  UNDO,
  REDO,
  EOG,
  NEW_GAME,
} from 'app-actions-types';
import {
  gameBoard,
  currentMove,
  winable,
  won,
} from 'app-selectors/game';
import { incStats, descStats } from './stats';

const checkEoG = () => (dispatch, getState) => {
  const state = getState();
  if (winable(state)) {
    const seq = endGameSequence(gameBoard(state), currentMove(state), setting(state));
    if (seq && seq.length > 0) {
      dispatch({ type: EOG, seq });
      const player = PlayerUtils.getPlayerFromMarker(currentMove(state).content);
      dispatch(incStats(player));
    }
  }
};

export const placeMarker = (x, y) => (dispatch) => {
  dispatch({ type: PLACE_MARKER, x, y });
  dispatch(checkEoG());
};

export const undo = () => (dispatch, getState) => {
  const state = getState();
  if (won(state)) {
    const player = PlayerUtils.getPlayerFromMarker(currentMove(state).content);
    dispatch(descStats(player));
  }
  dispatch({ type: UNDO });
  dispatch(checkEoG());
};

export const redo = () => (dispatch) => {
  dispatch({ type: REDO });
  dispatch(checkEoG());
};

export const newGame = () => ({
  type: NEW_GAME,
});

