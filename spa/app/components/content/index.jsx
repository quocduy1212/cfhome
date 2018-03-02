import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingEllipsis } from 'app-comps-common';
import {
  errorDetails,
  bellowBBUpperDetails,
  aboveBBMiddleOnAllDetails,
  aboveBBMiddleOnHourFiveMinDetails,
  belowBBMiddleOnAllIntervalDetails,
  downOnAllIntervalDetails,
  upOnAllIntervalDetails,
  upOnHourFiveMinIntervalDetails,
} from 'app-utils';
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
  state = {
    mode: 'bb',
  };

  renderContent = () => {
    const { processed } = this.props.indicators;
    const { mode } = this.state;
    let reordered = [];
    let MarketIndicatorsComp;
    if (mode === 'bb') {
      const first = processed.filter(m => !bellowBBUpperDetails(m.details) && !errorDetails(m.details));
      const middle = processed.filter(m => bellowBBUpperDetails(m.details));
      const last = processed.filter(m => errorDetails(m.details));
      reordered = [...first, ...middle, ...last];
      MarketIndicatorsComp = MarketIndicatorsBB;
    } else {
      const last = [];
      const allUp = [];
      const allAboveAndAllUp = [];
      const allAbove = [];
      const mixed = [];
      processed.forEach(m => {
        if (aboveBBMiddleOnAllDetails(m.details) && upOnAllIntervalDetails(m.details)) {
          allAboveAndAllUp.push(m);
        } else if (upOnAllIntervalDetails(m.details) && !belowBBMiddleOnAllIntervalDetails(m.details)) {
          allUp.push(m);
        } else if (aboveBBMiddleOnAllDetails(m.details) && !downOnAllIntervalDetails(m.details)) {
          allAbove.push(m);
        } else if (belowBBMiddleOnAllIntervalDetails(m.details) || downOnAllIntervalDetails(m.details)) {
          last.push({ ...m, hide: true });
        } else {
          mixed.push(m);
        }
      });
      const mixedFirst = [];
      const mixedSecond = [];
      const mixedLast = [];
      mixed.forEach(m => {
        if (aboveBBMiddleOnHourFiveMinDetails(m.details)) {
          mixedFirst.push(m);
        } else if (upOnHourFiveMinIntervalDetails(m.details)) {
          mixedSecond.push(m);
        } else {
          mixedLast.push({ ...m, hide: true });
        }
      });
      reordered = [
        ...allAboveAndAllUp,
        ...allUp,
        ...allAbove,
        ...[...mixedFirst, ...mixedSecond, ...mixedLast],
        ...last,
      ];
      MarketIndicatorsComp = MarketIndicatorsUpTrend;
    }
    return reordered.map(r => <MarketIndicatorsComp key={r.name} className="mt4 animated fadeInDown" {...r} />);
  };

  render() {
    const { className, summary, indicators } = this.props;
    const { mode } = this.state;
    const loadingMessage = getLoadingMessage(summary, indicators);
    const activeModeClass = 'bb b--blue bw2';
    return (
      <section className={`${className}`}>
        <div className="tr mt4">
          <span
            className={`dib f4 pointer ${mode === 'bb' ? activeModeClass : ''}`}
            onClick={() => this.setState({ mode: 'bb' })}
          >
            BB
          </span>
          <span
            className={`dib f4 ml4 pointer ${mode === 'up_trend' ? activeModeClass : ''}`}
            onClick={() => this.setState({ mode: 'up_trend' })}
          >
            Up Trend
          </span>
        </div>
        {loadingMessage && <LoadingEllipsis className="mt4" text={loadingMessage} />}
        {this.renderContent(indicators.processed)}
      </section>
    );
  }
}

const mapStateToProps = ({ summary, indicators }) => ({
  summary,
  indicators,
});

export default connect(mapStateToProps, {})(Content);
