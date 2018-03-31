import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { timestampToTime, timestampToDate } from 'app-utils';
import AreaStepXYTimeseries from './charts/area-step-xy-timeseries';
import MarketBB from './charts/market-bb';
import OrderBook from './charts/order-book';
import BBAll from './tables/bb-all';
import HistoryChange from './tables/history-change';
import MarketInfo from './market-info';
import MarketSto from './charts/market-sto';

const BB_TICKS = -50;

const volumeChartData = history => {
  let yvalues = [];

  let close = 0;
  let baseVolume = 0;
  history.forEach(h => {
    if (h.close > close) {
      baseVolume += h.baseVolume;
    } else {
      baseVolume -= h.baseVolume;
    }
    close = h.close;
    yvalues.push(baseVolume);
  });
  const min = Math.min(...yvalues);
  if (min < 0) {
    yvalues = yvalues.map(d => d - min);
  }
  return {
    xname: 'date',
    xvalues: history.map(d => timestampToDate(d.timestamp)),
    yname: 'volume',
    yvalues,
  };
};

const pricesChartData = history => ({
  xname: 'date',
  xvalues: history.map(d => timestampToDate(d.timestamp)),
  yname: 'price',
  yvalues: history.map(d => d.close),
});

class MarketDetails extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.bookmarked !== nextProps.bookmarked;
  }

  render() {
    const {
      className,
      base,
      exchange,
      name,
      dailyChange,
      bookmarked,
      onAddBookmark,
      onRemoveBookmark,
      details: {
        inspectedAt,
        error,
        fiveMin,
        hour,
        day,
        fiveMinHistory,
        hourHistory,
        dayHistory,
        fiveMinBb,
        hourBb,
        dayBb,
        fiveMinSto,
        hourSto,
        daySto,
        orderBook,
      },
      hide,
      bbCount,
      historyCount,
      bbChart,
      stoChart,
      orderBookChart,
      volumeChart,
      dayPricesChart,
    } = this.props;

    return (
      <div className={className}>
        {error && <div className="ba br2 b--red pv2 ph3 f6 mt2 red dib fr">{error}</div>}
        {hide && <div className="ba br2 b--orange pv2 ph3 f6 mt2 orange dib fr">{hide}</div>}
        <MarketInfo
          name={name}
          dailyChange={dailyChange}
          exchange={exchange}
          bookmarked={bookmarked}
          onAddBookmark={onAddBookmark}
          onRemoveBookmark={onRemoveBookmark}
        />
        <div className="f6">{inspectedAt ? timestampToTime(inspectedAt) : '--'}</div>
        {bbCount && <BBAll className="mt2" day={day} hour={hour} fiveMin={fiveMin} />}
        {historyCount && <HistoryChange className="mt2" day={day} hour={hour} fiveMin={fiveMin} />}
        {bbChart && (
          <MarketBB
            className="cf"
            dayHistory={dayHistory.slice(BB_TICKS)}
            hourHistory={hourHistory.slice(BB_TICKS)}
            fiveMinHistory={fiveMinHistory.slice(BB_TICKS)}
            fiveMinBb={fiveMinBb.slice(BB_TICKS)}
            hourBb={hourBb.slice(BB_TICKS)}
            dayBb={dayBb.slice(BB_TICKS)}
          />
        )}
        {stoChart && (
          <MarketSto
            className="cf"
            daySto={daySto.slice(BB_TICKS)}
            hourSto={hourSto.slice(BB_TICKS)}
            fiveMinSto={fiveMinSto.slice(BB_TICKS)}
          />
        )}
        {orderBookChart && <OrderBook className="cf" base={base} orderBook={orderBook} />}
        {dayPricesChart && <AreaStepXYTimeseries {...pricesChartData(dayHistory)} />}
        {volumeChart && <AreaStepXYTimeseries {...volumeChartData(dayHistory)} />}
      </div>
    );
  }
}

MarketDetails.propTypes = {
  bbCount: PropTypes.bool,
  historyCount: PropTypes.bool,
  bbChart: PropTypes.bool,
  orderBookChart: PropTypes.bool,
  volumeChart: PropTypes.bool,
  dayPricesChart: PropTypes.bool,
};

MarketDetails.defaultProps = {
  bbCount: false,
  historyCount: false,
  bbChart: false,
  stoChart: false,
  orderBookChart: false,
  volumeChart: false,
  dayPricesChart: false,
};
export default MarketDetails;
