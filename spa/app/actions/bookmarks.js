import api from 'app-lib/api';
import {
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
  UPDATE_BOOKMARK,
  LOAD_BOOKMARKS_INDICATORS,
  LOAD_BOOKMARK_MARKET_INDICATORS,
} from 'app-actions-types';
import { toast } from 'react-toastify';
import { getBookmark } from 'app-selectors/users';

const addBookmarkObj = market => ({
  type: ADD_BOOKMARK,
  market,
});

const removeBookmarkObj = market => ({
  type: REMOVE_BOOKMARK,
  market,
});

const updateBookmark = market => ({
  type: UPDATE_BOOKMARK,
  market,
});

export const addBookmark = market => dispatch => {
  dispatch(addBookmarkObj(market));
  api
    .post('/api/bookmarks', {
      ...market,
    })
    .then(response => {
      toast.success('Bookmark added');
      dispatch(updateBookmark(response.data));
    })
    .catch(() => {
      dispatch(removeBookmarkObj(market));
    });
};

export const removeBookmark = market => (dispatch, getState) => {
  const state = getState();
  const b = getBookmark(state, market.exchange, market.name);
  dispatch(removeBookmarkObj(market));
  api
    .delete(`/api/bookmarks/${b.id}`)
    .then(() => toast.success('Bookmark removed'))
    .catch(() => {
      dispatch(addBookmarkObj(market));
    });
};

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
  const markets = getState().users.bookmarks;
  dispatch({
    type: LOAD_BOOKMARKS_INDICATORS,
    markets,
  });
  if (markets && markets.length > 0) {
    dispatch(loadBookmarkMarketIndicators(markets[0]));
  }
};
