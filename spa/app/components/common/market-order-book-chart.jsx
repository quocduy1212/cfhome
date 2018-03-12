import React from 'react';
import { twoDecimalsInNumber } from 'app-utils';
import AreaSplineXY from './charts/area-spline-xy';

const yvalues = data => data.map(b => twoDecimalsInNumber(b.quantity * b.price));

const MarketOrderBookChart = ({ className = '', base, orderBook: { buy, sell } }) => {
  const buyYValues = yvalues(buy);
  const sellYValues = yvalues(sell);
  const totalBuy = twoDecimalsInNumber(buyYValues.reduce((sum, current) => sum + current));
  const totalSell = twoDecimalsInNumber(sellYValues.reduce((sum, current) => sum + current));
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
        totalY={totalBuy}
      />
      <AreaSplineXY
        className="fl w-50"
        prices={sell.map(b => b.price)}
        yvalues={sellYValues}
        yname={base}
        min={min}
        max={max}
        color="red"
        totalY={totalSell}
      />
    </div>
  );
};

export default MarketOrderBookChart;
