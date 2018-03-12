import React from 'react';
import AreaSplineXY from './charts/area-spline-xy';

const yvalues = data => data.map(b => Math.round(b.quantity * b.price * 100) / 100);

const MarketOrderBookChart = ({ className = '', base, orderBook: { buy, sell } }) => {
  const buyYValues = yvalues(buy);
  const sellYValues = yvalues(sell);
  const tmp = [...buyYValues, ...sellYValues];
  const min = Math.min(...tmp);
  const max = Math.max(...tmp);
  return (
    <div className={className}>
      <AreaSplineXY
        className="fl w-50"
        prices={buy.map(b => b.price)}
        yvalues={buyYValues}
        yname={base}
        min={min}
        max={max}
        color="green"
      />
      <AreaSplineXY
        className="fl w-50"
        prices={sell.map(b => b.price)}
        yvalues={sellYValues}
        yname={base}
        min={min}
        max={max}
        color="red"
      />
    </div>
  );
};

export default MarketOrderBookChart;
