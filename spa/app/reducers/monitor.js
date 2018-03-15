import { handle } from 'redux-pack';
import { LOAD_MONITOR_INDICATORS, LOAD_MONITOR_MARKET_INDICATORS } from 'app-actions-types';

const DEFAULT_STATE = {
  isProcessingCurrent: false,
  queue: [],
  current: {},
  processed: [],
};

const monitor = (state = DEFAULT_STATE, action) => {
  const { type, meta } = action;
  switch (type) {
    case LOAD_MONITOR_INDICATORS:
      return {
        ...DEFAULT_STATE,
        queue: action.markets,
      };
    case LOAD_MONITOR_MARKET_INDICATORS:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isProcessingCurrent: true,
          current: meta.market,
          queue: prevState.queue.filter(m => `${m.name}${m.exchange}` !== `${meta.market.name}${meta.market.exchange}`),
        }),
        finish: prevState => ({
          ...prevState,
          current: {},
          isProcessingCurrent: false,
        }),
        failure: prevState => ({
          ...prevState,
          processed: [
            ...prevState.processed,
            {
              ...meta.market,
              details: {
                error: 'Unknow error',
              },
            },
          ],
        }),
        success: prevState => ({
          ...prevState,
          processed: [
            ...prevState.processed,
            {
              ...meta.market,
              details: action.payload.data,
            },
          ],
        }),
      });
    default:
      return state;
  }
};

export default monitor;
