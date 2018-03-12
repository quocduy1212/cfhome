import React from 'react';
import numeral from 'numeral';
import AreaSplineXY from './charts/area-spline-xy';

const MarketOrderBookChart = ({ className = '', base, orderBook: { buy, sell } }) => (
  <div className={className}>
    <AreaSplineXY
      className="fl w-50"
      prices={buy.map(b => b.price)}
      quantity={buy.map(b => numeral(b.quantity * b.price).format('.00'))}
      yname={base}
      color="green"
    />
    <AreaSplineXY
      className="fl w-50"
      prices={sell.map(b => b.price)}
      quantity={sell.map(b => numeral(b.quantity * b.price).format('.00'))}
      yname={base}
      color="red"
    />
  </div>
);

export default MarketOrderBookChart;
