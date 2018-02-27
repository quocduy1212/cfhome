import { createSelector } from 'reselect';
import _ from 'lodash';
import PlayerUtils from 'app-game-player-utils';
import { setting } from './setting';

const gameMoves = state => state.game.moves;
const gameCurrentMoveIdx = state => state.game.currentMoveIdx;
const gameWinSeq = state => state.game.winSeq;
const gamePlayerTurn = state => state.game.turn;

export const won = createSelector(
  setting,
  gameWinSeq,
  ({ win }, seq) => seq && seq.length === win,
);

export const playerTurnMarker = createSelector(
  gamePlayerTurn,
  (turn) => PlayerUtils.getPlayerMarker(turn),
);

export const winable = createSelector(
  setting,
  gameCurrentMoveIdx,
  ({ win }, index) => index + 1 >= (win * 2) - 1,
);

export const currentMove = createSelector(
  gameMoves,
  gameCurrentMoveIdx,
  (moves, index) => moves[index],
);

export const firstPlayerWin = createSelector(
  won,
  currentMove,
  (finished, move) => (finished && PlayerUtils.isFirstPlayerFromContent(move.content)),
);

export const secondPlayerWin = createSelector(
  won,
  currentMove,
  (finished, move) => (finished && PlayerUtils.isSecondPlayerFromContent(move.content)),
);

export const redoable = createSelector(
  gameMoves,
  gameCurrentMoveIdx,
  (moves, index) => moves.length > 0 && index < moves.length - 1,
);

export const undoable = createSelector(
  gameMoves,
  gameCurrentMoveIdx,
  (moves, index) => moves.length > 0 && index >= 0,
);

export const gameBoard = createSelector(
  setting,
  gameMoves,
  gameCurrentMoveIdx,
  ({ row, col }, moves, index) => {
    const board = _.times(row, () => _.times(col, () => ''));
    const pastMoves = moves.slice(0, index + 1);
    pastMoves.forEach(({ x, y, content }) => {
      board[x][y] = content;
    });
    return board;
  },
);

export const decoratedGameBoard = createSelector(
  gameBoard,
  gameWinSeq,
  playerTurnMarker,
  won,
  (board, winSeq, currentMarker, finished) => {
    const newBoard = board.map((row) =>
      row.map((cell) => ({
        content: cell,
        nextTurnMarker: currentMarker,
        finished,
      })),
    );
    winSeq.forEach(({ x, y }) => {
      newBoard[x][y].dance = true;
    });
    return newBoard;
  },
);

