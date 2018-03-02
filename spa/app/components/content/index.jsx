import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingEllipsis } from 'app-comps-common';
import { errorDetails, bellowBBUpperDetails } from 'app-utils';
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
      reordered = processed;
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
        {loadingMessage && <LoadingEllipsis text={loadingMessage} />}
        <hr className="bt b--gray mt4" />
        <div className="tc mt4">
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
