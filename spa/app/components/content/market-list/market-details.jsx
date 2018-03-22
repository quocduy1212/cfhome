import React from 'react';
import { MarketBBChart, MarketOrderBookChart } from 'app-comps-common';
import { twoDecimals } from 'app-utils';
import BBAll from '../tables/bb-all';
import HistoryChange from '../tables/history-change';
import MarketInfo from './market-info';

const formatDate = timestamp => {
  const d = new Date(timestamp * 1000);
  return `${twoDecimals(d.getHours())}:${twoDecimals(d.getMinutes())}:${twoDecimals(d.getSeconds())}`;
};

const MarketDetails = ({
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
    orderBook,
  },
  hide,
}) => (
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
    <div className="f6">{inspectedAt ? formatDate(inspectedAt) : '--'}</div>
    <BBAll className="mt2" day={day} hour={hour} fiveMin={fiveMin} />
    <HistoryChange className="mt2" day={day} hour={hour} fiveMin={fiveMin} />
    <MarketBBChart
      className="cf"
      dayHistory={dayHistory}
      hourHistory={hourHistory}
      fiveMinHistory={fiveMinHistory}
      fiveMinBb={fiveMinBb}
      hourBb={hourBb}
      dayBb={dayBb}
    />
    <MarketOrderBookChart className="cf" base={base} orderBook={orderBook} />
  </div>
);

export default MarketDetails;
