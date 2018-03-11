import { handle } from 'redux-pack';
import {
  REMOVE_BOOKMARK,
  ADD_BOOKMARK,
  LOAD_BOOKMARKS_INDICATORS,
  LOAD_BOOKMARK_MARKET_INDICATORS,
} from 'app-actions-types';

const DEFAULT_STATE = {
  isProcessingCurrent: false,
  queue: [],
  current: {},
  processed: [],
};

const bookmarks = (state = DEFAULT_STATE, action) => {
  const { type, market, meta } = action;
  switch (type) {
    case ADD_BOOKMARK:
      return {
        ...DEFAULT_STATE,
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        processed: state.processed.filter(b => `${b.name}${b.exchange}` !== `${market.name}${market.exchange}`) || [],
      };
    case LOAD_BOOKMARKS_INDICATORS:
      return {
        ...DEFAULT_STATE,
        queue: action.markets,
      };
    case LOAD_BOOKMARK_MARKET_INDICATORS:
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

export default bookmarks;
