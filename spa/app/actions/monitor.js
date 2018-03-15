import api from 'lib/api';
import { LOAD_MONITOR_INDICATORS, LOAD_MONITOR_MARKET_INDICATORS } from 'app-actions-types';

export const loadMonitorMarketIndicators = market => (dispatch, getState) => {
  dispatch({
    type: LOAD_MONITOR_MARKET_INDICATORS,
    promise: api.get('/api/filters/indicators', {
      exchange: market.exchange,
      base: market.base,
      symbol: market.symbol,
    }),
    meta: {
      market,
      onSuccess: () => {
        const queue = getState().monitor.queue;
        if (queue && queue.length > 0) {
          dispatch(loadMonitorMarketIndicators(queue[0]));
        }
      },
    },
  });
};

export const loadMonitorIndicators = markets => dispatch => {
  dispatch({
    type: LOAD_MONITOR_INDICATORS,
    markets,
  });
  if (markets && markets.length > 0) {
    dispatch(loadMonitorMarketIndicators(markets[0]));
  }
};
