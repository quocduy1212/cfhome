import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingEllipsis } from 'app-comps-common';
import { orderedData } from 'app-selectors/indicators';
import { indicatorsSettingChange } from 'app-actions/settings';
import MarketIndicatorsBB from './market-indicators-bb';
import MarketIndicatorsUpTrend from './market-indicators-uptrend';
import './content.scss';

const getLoadingMessage = (summary, { isProcessingCurrent, queue, processed, current }) => {
  if (summary.isLoading) {
    return 'Loading | Summary';
  } else if (isProcessingCurrent) {
    return `Loading | Indicators | ${processed.length + 1}/${processed.length + queue.length + 1} | ${current.name}`;
  }
  return '';
};

class Content extends Component {
  renderContent = () => {
    const { mode, reordered } = this.props;
    let MarketIndicatorsComp;
    if (mode === 'bb') {
      MarketIndicatorsComp = MarketIndicatorsBB;
    } else {
      MarketIndicatorsComp = MarketIndicatorsUpTrend;
    }
    return reordered.map(r => <MarketIndicatorsComp key={r.name} className="mt4 animated fadeInDown" {...r} />);
  };

  render() {
    const { className, loadingMessage, mode } = this.props;
    const activeModeClass = 'bb b--blue bw2';
    return (
      <section className={`${className}`}>
        <div className="tr mt4">
          <span
            className={`dib f4 pointer ${mode === 'bb' ? activeModeClass : ''}`}
            onClick={() => this.props.indicatorsSettingChange({ displayMode: 'bb' })}
          >
            BB
          </span>
          <span
            className={`dib f4 ml4 pointer ${mode === 'up_trend' ? activeModeClass : ''}`}
            onClick={() => this.props.indicatorsSettingChange({ displayMode: 'up_trend' })}
          >
            Up Trend
          </span>
        </div>
        {loadingMessage && <LoadingEllipsis className="mt4" text={loadingMessage} />}
        {this.renderContent()}
      </section>
    );
  }
}

const mapStateToProps = state => ({
  loadingMessage: getLoadingMessage(state.summary, state.indicators),
  mode: state.settings.indicators.displayMode,
  reordered: orderedData(state),
});

export default connect(mapStateToProps, {
  indicatorsSettingChange,
})(Content);
