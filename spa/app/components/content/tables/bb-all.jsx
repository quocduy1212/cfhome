import React from 'react';
import { twoDecimals } from 'app-utils';

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
        <td className="ba ph2">{twoDecimals(day.bb.upper)}</td>
        <td className="ba ph2">{twoDecimals(hour.bb.upper)}</td>
        <td className="ba ph2">{twoDecimals(fiveMin.bb.upper)}</td>
      </tr>
      <tr>
        <td className="ba ph2 fw7">BB Middle</td>
        <td className="ba ph2">{twoDecimals(day.bb.middle)}</td>
        <td className="ba ph2">{twoDecimals(hour.bb.middle)}</td>
        <td className="ba ph2">{twoDecimals(fiveMin.bb.middle)}</td>
      </tr>
      <tr>
        <td className="ba ph2 fw7">Up</td>
        <td className="ba ph2">{twoDecimals(day.up)}</td>
        <td className="ba ph2">{twoDecimals(hour.up)}</td>
        <td className="ba ph2">{twoDecimals(fiveMin.up)}</td>
      </tr>
    </tbody>
  </table>
);

export default BBAll;
