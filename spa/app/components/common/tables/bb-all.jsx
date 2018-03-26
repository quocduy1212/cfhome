import React from 'react';
import { twoDecimals } from 'app-utils';

const getColor = c => {
  if (c > 0) {
    return 'ba ph2 bg-light-green';
  }
  return 'ba ph2 bg-light-yellow';
};

const BBAll = ({ className = '', fiveMin, hour, day }) => (
  <table className={className}>
    <thead>
      <tr>
        <th />
        <th className="ba ph2">1D</th>
        <th className="ba ph2">1H</th>
        <th className="ba ph2">5M</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td className="ba ph2 fw7">BB Upper</td>
        <td className={getColor(day.bb.upper)}>{twoDecimals(day.bb.upper)}</td>
        <td className={getColor(hour.bb.upper)}>{twoDecimals(hour.bb.upper)}</td>
        <td className={getColor(fiveMin.bb.upper)}>{twoDecimals(fiveMin.bb.upper)}</td>
      </tr>
      <tr>
        <td className="ba ph2 fw7">BB Middle</td>
        <td className={getColor(day.bb.middle)}>{twoDecimals(day.bb.middle)}</td>
        <td className={getColor(hour.bb.middle)}>{twoDecimals(hour.bb.middle)}</td>
        <td className={getColor(fiveMin.bb.middle)}>{twoDecimals(fiveMin.bb.middle)}</td>
      </tr>
      <tr>
        <td className="ba ph2 fw7">Up</td>
        <td className={getColor(day.up)}>{twoDecimals(day.up)}</td>
        <td className={getColor(hour.up)}>{twoDecimals(hour.up)}</td>
        <td className={getColor(fiveMin.up)}>{twoDecimals(fiveMin.up)}</td>
      </tr>
    </tbody>
  </table>
);

export default BBAll;
