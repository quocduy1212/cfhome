import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as filterActions from 'app-actions/filters';
import styles from './top-bar.scss';

const CRYPTO_EXCHANGE = [
  {
    value: 'bittrex',
    label: 'Bittrex',
  },
  {
    value: 'binance',
    label: 'Binance',
  },
];
const CRYPTO_EXCHANGE_DEFAULT = CRYPTO_EXCHANGE[0];

const DAILY_CHANGES = [
  {
    value: '0.01',
    label: '1%',
  },
  {
    value: '0.02',
    label: '2%',
  },
  {
    value: '0.03',
    label: '3%',
  },
  {
    value: '0.05',
    label: '5%',
  },
  {
    value: '0.1',
    label: '10%',
  },
];
const BTC_DAILY_CHANGE_DEFAULT = DAILY_CHANGES[3];
const USDT_DAILY_CHANGE_DEFAULT = DAILY_CHANGES[1];

class TopBar extends Component {
  state = {
    exchange: CRYPTO_EXCHANGE_DEFAULT.value,
    btc: BTC_DAILY_CHANGE_DEFAULT.value,
    usdt: USDT_DAILY_CHANGE_DEFAULT.value,
  };

  onFiltering = () => {
    const { isProcessing, filterBySummary } = this.props;
    const { exchange, btc, usdt } = this.state;
    if (!isProcessing) {
      filterBySummary(exchange, btc, usdt);
    }
  };

  render() {
    const { className, isProcessing } = this.props;
    const { exchange, btc, usdt } = this.state;
    return (
      <header className={className}>
        <Select
          name="form-field-name"
          className={`${styles.exchangeSelector} dib`}
          value={exchange}
          onChange={filterObj => this.setState({ exchange: filterObj.value })}
          options={CRYPTO_EXCHANGE}
          clearable={false}
          searchable={false}
          optionClassName="tc"
        />
        <Select
          name="form-field-name"
          className={`${styles.dailyChangeSelector} dib ml4`}
          value={btc}
          onChange={filterObj => this.setState({ btc: filterObj.value })}
          options={DAILY_CHANGES}
          clearable={false}
          searchable={false}
          optionClassName="tc"
        />
        <Select
          name="form-field-name"
          className={`${styles.dailyChangeSelector} dib ml4`}
          value={usdt}
          onChange={filterObj => this.setState({ usdt: filterObj.value })}
          options={DAILY_CHANGES}
          clearable={false}
          searchable={false}
          optionClassName="tc"
        />
        <span className={`ml4 ${isProcessing ? 'light-gray' : 'pointer'}`} onClick={this.onFiltering}>
          <i className="material-icons f2">play_arrow</i>
          <i className="material-icons f2 nl3">play_arrow</i>
        </span>
      </header>
    );
  }
}

const mapStateToProps = ({ summary, indicators }) => ({
  isProcessing: summary.isLoading || indicators.isProcessingCurrent,
});

const mapDispatchToProps = {
  filterBySummary: filterActions.filterBySummary,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
