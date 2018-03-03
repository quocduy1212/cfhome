import { INDICATORS_SETTINGS_CHANGE } from 'app-actions-types';

const CRYPTO_EXCHANGE = [{ value: 'bittrex', label: 'Bittrex' }, { value: 'binance', label: 'Binance' }];
const CRYPTO_EXCHANGE_DEFAULT = CRYPTO_EXCHANGE[0];
const DAILY_CHANGES = [
  { value: '0.01', label: '1%' },
  { value: '0.02', label: '2%' },
  { value: '0.03', label: '3%' },
  { value: '0.05', label: '5%' },
  { value: '0.1', label: '10%' },
];
const BTC_DAILY_CHANGE_DEFAULT = DAILY_CHANGES[3];
const USDT_DAILY_CHANGE_DEFAULT = DAILY_CHANGES[1];

const DEFAULT_STATE = {
  indicators: {
    displayMode: 'bb',
    exchange: CRYPTO_EXCHANGE_DEFAULT.value,
    btc: BTC_DAILY_CHANGE_DEFAULT.value,
    usdt: USDT_DAILY_CHANGE_DEFAULT.value,
  },
  constants: {
    DAILY_CHANGES,
    CRYPTO_EXCHANGE,
  },
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
    default:
      return state;
  }
};

export default settings;
