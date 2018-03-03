import api from 'lib/api';
import { LOAD_SUMMARY, LOAD_INDICATORS, LOAD_INDICATORS_MARKET } from 'app-actions-types';
import { indicatorsSettings } from 'app-selectors/settings';

export const loadIndicatorsForMarket = market => (dispatch, getState) => {
  dispatch({
    type: LOAD_INDICATORS_MARKET,
    promise: api.get('/api/filters/indicators', {
      exchange: indicatorsSettings(getState()).exchange,
      base: market.base,
      symbol: market.symbol,
    }),
    meta: {
      market,
      onSuccess: () => {
        const queue = getState().indicators.queue;
        if (queue && queue.length > 0) {
          dispatch(loadIndicatorsForMarket(queue[0]));
        }
      },
    },
  });
};

export const loadIndicators = markets => dispatch => {
  dispatch({
    type: LOAD_INDICATORS,
    markets,
  });
  if (markets && markets.length > 0) {
    dispatch(loadIndicatorsForMarket(markets[0]));
  }
};

export const filterBySummary = (exchange, btc, usdt) => dispatch => {
  dispatch({
    type: LOAD_SUMMARY,
    promise: api.get('/api/filters/summary', { exchange, btc, usdt }),
    meta: {
      onSuccess: response => dispatch(loadIndicators(response.data)),
    },
  });
};
