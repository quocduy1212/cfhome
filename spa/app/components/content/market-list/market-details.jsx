import React from 'react';
import { MarketBBChart } from 'app-comps-common';
import BBAll from '../tables/bb-all';
import HistoryChange from '../tables/history-change';
import MarketInfo from './market-info';

const MarketDetails = ({
  className,
  exchange,
  name,
  dailyChange,
  bookmarked,
  onAddBookmark,
  onRemoveBookmark,
  details: { error, fiveMin, hour, day, fiveMinHistory, hourHistory, dayHistory, fiveMinBb, hourBb, dayBb },
  hide,
}) => {
  const content = !error && !hide;
  return (
    <div className={className}>
      <MarketInfo
        name={name}
        dailyChange={dailyChange}
        exchange={exchange}
        bookmarked={bookmarked}
        onAddBookmark={onAddBookmark}
        onRemoveBookmark={onRemoveBookmark}
      />
      {error && <div className="ba br2 b--red pv2 ph3 f6 mt2 red">{error}</div>}
      {hide && <div className="ba br2 b--orange pv2 ph3 f6 mt2 orange">{hide}</div>}
      {content && <BBAll className="mt2" day={day} hour={hour} fiveMin={fiveMin} />}
      {content && <HistoryChange className="mt2" day={day} hour={hour} fiveMin={fiveMin} />}
      <MarketBBChart
        className="cf"
        dayHistory={dayHistory}
        hourHistory={hourHistory}
        fiveMinHistory={fiveMinHistory}
        fiveMinBb={fiveMinBb}
        hourBb={hourBb}
        dayBb={dayBb}
      />
    </div>
  );
};

export default MarketDetails;
