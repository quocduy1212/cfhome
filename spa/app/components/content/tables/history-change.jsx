import React from 'react';
import { toPercentageNoDecimal } from 'app-utils';

const HistoryChange = ({ className = '', fiveMin, hour, day }) => (
  <table className={className}>
    <tbody>
      <tr>
        <td className="fw7 ba ph2">5M</td>
        {fiveMin.hc.map((c, i) => (
          <td key={i} className="tr ba ph2">
            {toPercentageNoDecimal(c)}
          </td>
        ))}
      </tr>
      <tr>
        <td className="fw7 ba ph2">1H</td>
        {hour.hc.map((c, i) => (
          <td key={i} className="tr ba ph2">
            {toPercentageNoDecimal(c)}
          </td>
        ))}
      </tr>
      <tr>
        <td className="fw7 ba ph2">1D</td>
        {day.hc.map((c, i) => (
          <td key={i} className="tr ba ph2">
            {toPercentageNoDecimal(c)}
          </td>
        ))}
      </tr>
    </tbody>
  </table>
);

export default HistoryChange;
