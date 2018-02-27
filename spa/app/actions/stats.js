import PlayerUtils from 'app-game-player-utils';
import {
  INC_STATS,
  DESC_STATS,
} from 'app-actions-types';

export const incStats = (player) => ({
  type: INC_STATS,
  isFirstPlayer: PlayerUtils.isFirstPlayer(player),
});

export const descStats = (player) => ({
  type: DESC_STATS,
  isFirstPlayer: PlayerUtils.isFirstPlayer(player),
});
