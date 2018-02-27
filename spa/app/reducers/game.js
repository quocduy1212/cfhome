import PlayerUtils from 'app-game-player-utils';
import {
  PLACE_MARKER,
  UNDO,
  REDO,
  EOG,
  NEW_GAME,
} from 'app-actions-types';

const DEFAULT_STATE = {
  moves: [],
  currentMoveIdx: -1,
  turn: PlayerUtils.getFirstPlayer(),
  winSeq: [],
};

const game = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case PLACE_MARKER:
      return {
        ...state,
        moves: [
          ...state.moves.slice(0, state.currentMoveIdx + 1),
          {
            x: action.x,
            y: action.y,
            content: PlayerUtils.getPlayerMarker(state.turn),
          },
        ],
        currentMoveIdx: state.currentMoveIdx + 1,
        turn: PlayerUtils.getNextPlayer(state.turn),
      };
    case UNDO:
      return {
        ...state,
        winSeq: [],
        currentMoveIdx: state.currentMoveIdx - 1,
        turn: PlayerUtils.getNextPlayer(state.turn),
      };
    case REDO:
      return {
        ...state,
        winSeq: [],
        currentMoveIdx: state.currentMoveIdx + 1,
        turn: PlayerUtils.getNextPlayer(state.turn),
      };
    case EOG:
      return {
        ...state,
        winSeq: action.seq,
      };
    case NEW_GAME:
      return {
        ...DEFAULT_STATE,
        turn: state.turn,
      };
    default:
      return state;
  }
};

export default game;
