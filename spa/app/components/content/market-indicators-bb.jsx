import React from 'react';
import numeral from 'numeral';
import { bellowBBUpper } from 'app-utils';

const twoDecimals = number => numeral(number).format('00');
const toPercentage = dotPercentage => `${dotPercentage > 0 ? '+' : ''}${numeral(dotPercentage * 100).format('0.00')}%`;
const toPercentageNoDecimal = dotPercentage =>
  `${dotPercentage > 0 ? '+' : ''}${numeral(dotPercentage * 100).format('0')}%`;

const MarketIndicatorsBB = ({ className, name, dailyChange, details: { error, fiveMin, hour, day } }) => {
  const hide = bellowBBUpper(fiveMin, hour, day);
  const content = !error && !hide;
  return (
    <div className={className}>
      <div className="f3 fw7">{name}</div>
      <div className="f6 green">{toPercentage(dailyChange)}</div>
      {error && <div className="ba br2 b--red pv2 ph3 f6 mt2 red">{error}</div>}
      {hide && <div className="ba br2 b--orange pv2 ph3 f6 mt2 orange">Not on BB upper line</div>}
      {content && (
        <table className="mt2">
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
              <td className="ba ph2 fw7">BB</td>
              <td className="ba ph2">{twoDecimals(day.bb.upper)}</td>
              <td className="ba ph2">{twoDecimals(hour.bb.upper)}</td>
              <td className="ba ph2">{twoDecimals(fiveMin.bb.upper)}</td>
            </tr>
            <tr>
              <td className="ba ph2 fw7">Up</td>
              <td className="ba ph2">{twoDecimals(day.up)}</td>
              <td className="ba ph2">{twoDecimals(hour.up)}</td>
              <td className="ba ph2">{twoDecimals(fiveMin.up)}</td>
            </tr>
          </tbody>
        </table>
      )}
      {content && (
        <table className="mt2">
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
      )}
    </div>
  );
};

export default MarketIndicatorsBB;
