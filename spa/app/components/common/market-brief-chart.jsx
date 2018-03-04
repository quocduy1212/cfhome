import React from 'react';
import AreaSpline from './charts/area-spline';

const MarketBriefChart = ({ className = '', dayHistory, hourHistory, fiveMinHistory }) => (
  <div className={className}>
    <AreaSpline className="fl w-third" data={dayHistory.map(h => h.close)} />
    <AreaSpline className="fl w-third" data={hourHistory.map(h => h.close)} />
    <AreaSpline className="fl w-third" data={fiveMinHistory.map(h => h.close)} />
  </div>
);

export default MarketBriefChart;
