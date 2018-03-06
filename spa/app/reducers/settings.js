import { GLOBAL_SETTINGS_CHANGE, INDICATORS_SETTINGS_CHANGE } from 'app-actions-types';

const CRYPTO_EXCHANGE = [
  { value: 'all', label: 'All' },
  { value: 'bittrex', label: 'Bittrex' },
  { value: 'binance', label: 'Binance' },
  { value: 'poloniex', label: 'Poloniex' },
];
const CRYPTO_EXCHANGE_DEFAULT = CRYPTO_EXCHANGE[0];
const DAILY_CHANGES = [
  { value: '1', label: '1%' },
  { value: '2', label: '2%' },
  { value: '3', label: '3%' },
  { value: '5', label: '5%' },
  { value: '10', label: '10%' },
];
const BTC_DAILY_CHANGE_DEFAULT = DAILY_CHANGES[3];
const USDT_DAILY_CHANGE_DEFAULT = DAILY_CHANGES[1];

const DEFAULT_STATE = {
  indicators: {
    exchange: CRYPTO_EXCHANGE_DEFAULT.value,
    btc: BTC_DAILY_CHANGE_DEFAULT.value,
    usdt: USDT_DAILY_CHANGE_DEFAULT.value,
  },
  constants: {
    DAILY_CHANGES,
    CRYPTO_EXCHANGE,
  },
  page: 'indicators',
  displayMode: 'up_trend',
};

const settings = (state = DEFAULT_STATE, action) => {
  const { type } = action;
  switch (type) {
    case INDICATORS_SETTINGS_CHANGE:
      return {
        ...state,
        indicators: {
          ...state.indicators,
          ...action.indicators,
        },
      };
    case GLOBAL_SETTINGS_CHANGE:
      return {
        ...state,
        ...action.settings,
      };
    default:
      return state;
  }
};

export default settings;
