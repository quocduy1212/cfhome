import React from 'react';
import AreaSplineV2 from './charts/area-spline_v2';

const closePrices = history => history.map(h => h.close);
const bbLower = bb => bb.filter(b => !!b).map(c => (c[2] > 0 ? c[2] : 0));
const bbUpper = bb => bb.filter(b => !!b).map(c => (c[1] > 0 ? c[1] : 0));
const minValue = (history, bb) => {
  const lowers = bbLower(bb);
  const closes = closePrices(history);
  return Math.min(...lowers.concat(closes));
};

const maxValue = (history, bb) => {
  const highers = bbUpper(bb);
  const closes = closePrices(history);
  return Math.max(...highers.concat(closes));
};
const lowersData = bb =>
  bb.map(b => {
    if (b) {
      return b[2] < 0 ? 0 : b[2];
    }
    return null;
  });

const MarketBBChart = ({ className = '', dayHistory, hourHistory, fiveMinHistory, dayBb, hourBb, fiveMinBb }) => (
  <div className={className}>
    <AreaSplineV2
      className="fl w-third"
      min={minValue(dayHistory, dayBb)}
      max={maxValue(dayHistory, dayBb)}
      prices={closePrices(dayHistory)}
      lowers={lowersData(dayBb)}
      uppers={dayBb.map(b => (b ? b[1] : null))}
      middles={dayBb.map(b => (b ? b[0] : null))}
    />
    <AreaSplineV2
      className="fl w-third"
      min={minValue(hourHistory, hourBb)}
      max={maxValue(hourHistory, hourBb)}
      prices={closePrices(hourHistory)}
      lowers={lowersData(hourBb)}
      uppers={hourBb.map(b => (b ? b[1] : null))}
      middles={hourBb.map(b => (b ? b[0] : null))}
    />
    <AreaSplineV2
      className="fl w-third"
      min={minValue(fiveMinHistory, fiveMinBb)}
      max={maxValue(fiveMinHistory, fiveMinBb)}
      prices={closePrices(fiveMinHistory)}
      lowers={lowersData(fiveMinBb)}
      uppers={fiveMinBb.map(b => (b ? b[1] : null))}
      middles={fiveMinBb.map(b => (b ? b[0] : null))}
    />
  </div>
);

export default MarketBBChart;
