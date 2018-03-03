import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { filterBySummary } from 'app-actions/filters';
import { indicatorsSettingChange } from 'app-actions/settings';
import styles from './top-bar.scss';

class TopBar extends Component {
  onFiltering = () => {
    const { isProcessing, settings } = this.props;
    const { exchange, btc, usdt } = settings.indicators;
    if (!isProcessing) {
      this.props.filterBySummary(exchange, btc, usdt);
    }
  };

  render() {
    const { className, isProcessing, settings } = this.props;
    const { exchange, btc, usdt } = settings.indicators;
    const { DAILY_CHANGES, CRYPTO_EXCHANGE } = settings.constants;
    return (
      <header className={`${className} ph5 ph0-ns tc-ns`}>
        <Select
          name="form-field-name"
          className={`${styles.exchangeSelector} db dib-ns tl`}
          value={exchange}
          onChange={filterObj => this.props.indicatorsSettingChange({ exchange: filterObj.value })}
          options={CRYPTO_EXCHANGE}
          clearable={false}
          searchable={false}
          optionClassName="tc"
        />
        <Select
          name="form-field-name"
          className={`${styles.dailyChangeSelector} db dib-ns tl ml4-ns mt2 mt0-ns`}
          value={btc}
          onChange={filterObj => this.props.indicatorsSettingChange({ btc: filterObj.value })}
          options={DAILY_CHANGES}
          clearable={false}
          searchable={false}
          optionClassName="tc"
        />
        <Select
          name="form-field-name"
          className={`${styles.dailyChangeSelector} db dib-ns tl ml4-ns mt2 mt0-ns`}
          value={usdt}
          onChange={filterObj => this.props.indicatorsSettingChange({ usdt: filterObj.value })}
          options={DAILY_CHANGES}
          clearable={false}
          searchable={false}
          optionClassName="tc"
        />
        <span
          className={`db dib-ns ml4-ns mt4 mt0-ns ${isProcessing ? 'light-gray' : 'pointer'}`}
          onClick={this.onFiltering}
        >
          <i className="material-icons f2">play_arrow</i>
          <i className="material-icons f2 nl3">play_arrow</i>
        </span>
      </header>
    );
  }
}

const mapStateToProps = ({ summary, indicators, settings }) => ({
  isProcessing: summary.isLoading || indicators.isProcessingCurrent,
  settings,
});

const mapDispatchToProps = {
  filterBySummary,
  indicatorsSettingChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
