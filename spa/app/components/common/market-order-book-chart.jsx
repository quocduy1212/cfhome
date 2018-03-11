import React from 'react';
import AreaSplineXY from './charts/area-spline-xy';

const MarketOrderBookChart = ({ className = '', orderBook: { buy, sell } }) => (
  <div className={className}>
    <AreaSplineXY className="fl w-50" prices={buy.map(b => b.price)} quantity={buy.map(b => b.quantity)} />
    <AreaSplineXY className="fl w-50" prices={sell.map(b => b.price)} quantity={sell.map(b => b.quantity)} />
  </div>
);

export default MarketOrderBookChart;
