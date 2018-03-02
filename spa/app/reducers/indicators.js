import { LOAD_INDICATORS, LOAD_INDICATORS_MARKET } from 'app-actions-types';
import { handle } from 'redux-pack';

const DEFAULT_STATE = {
  isProcessingCurrent: false,
  queue: [],
  current: {},
  processed: [],
};

const bbDetails = (state = DEFAULT_STATE, action) => {
  const { type, payload, markets, meta } = action;
  switch (type) {
    case LOAD_INDICATORS:
      return {
        ...DEFAULT_STATE,
        queue: markets,
      };
    case LOAD_INDICATORS_MARKET:
      return handle(state, action, {
        start: prevState => ({
          ...prevState,
          isProcessingCurrent: true,
          current: meta.market,
          queue: prevState.queue.filter(m => m.name !== meta.market.name),
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
              details: payload.data,
            },
          ],
        }),
      });
    default:
      return state;
  }
};

export default bbDetails;
