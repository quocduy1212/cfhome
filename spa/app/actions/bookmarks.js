import api from 'lib/api';
import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  LOAD_BOOKMARKS_INDICATORS,
  LOAD_BOOKMARK_MARKET_INDICATORS,
} from 'app-actions-types';

export const addBookmark = market => ({
  type: ADD_BOOKMARK,
  market,
});

export const removeBookmark = market => ({
  type: REMOVE_BOOKMARK,
  market,
});

export const loadBookmarkMarketIndicators = market => (dispatch, getState) => {
  dispatch({
    type: LOAD_BOOKMARK_MARKET_INDICATORS,
    promise: api.get('/api/filters/indicators', {
      exchange: market.exchange,
      base: market.base,
      symbol: market.symbol,
    }),
    meta: {
      market,
      onSuccess: () => {
        const queue = getState().bookmarks.queue;
        if (queue && queue.length > 0) {
          dispatch(loadBookmarkMarketIndicators(queue[0]));
        }
      },
    },
  });
};

export const loadBookmarksIndicators = () => (dispatch, getState) => {
  const markets = getState().bookmarks.bookmarks;
  dispatch({
    type: LOAD_BOOKMARKS_INDICATORS,
    markets,
  });
  if (markets && markets.length > 0) {
    dispatch(loadBookmarkMarketIndicators(markets[0]));
  }
};
