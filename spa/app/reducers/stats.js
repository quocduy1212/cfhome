import {
  INC_STATS,
  DESC_STATS,
} from 'app-actions-types';

const DEFAULT_STATE = {
  firstPlayerWin: 0,
  secondPlayerWin: 0,
};

const incStats = (state, action) => {
  let inc = { secondPlayerWin: state.secondPlayerWin + 1 };
  if (action.isFirstPlayer) {
    inc = { firstPlayerWin: state.firstPlayerWin + 1 };
  }
  return {
    ...state,
    ...inc,
  };
};
const descStats = (state, action) => {
  let desc = { secondPlayerWin: state.secondPlayerWin - 1 };
  if (action.isFirstPlayer) {
    desc = { firstPlayerWin: state.firstPlayerWin - 1 };
  }
  return {
    ...state,
    ...desc,
  };
};

const stats = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case INC_STATS:
      return incStats(state, action);
    case DESC_STATS:
      return descStats(state, action);
    default:
      return state;
  }
};

export default stats;
