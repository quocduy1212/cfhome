import React from 'react';
import Spline from './spline';

const MarketSto = ({ className = '', daySto, hourSto, fiveMinSto }) => (
  <div className={className}>
    <Spline
      className="fl w-third"
      fast={daySto.map(d => d[0])}
      slow={daySto.map(d => d[1])}
      full={daySto.map(d => d[2])}
    />
    <Spline
      className="fl w-third"
      fast={hourSto.map(d => d[0])}
      slow={hourSto.map(d => d[1])}
      full={hourSto.map(d => d[2])}
    />
    <Spline
      className="fl w-third"
      fast={fiveMinSto.map(d => d[0])}
      slow={fiveMinSto.map(d => d[1])}
      full={fiveMinSto.map(d => d[2])}
    />
  </div>
);

export default MarketSto;
