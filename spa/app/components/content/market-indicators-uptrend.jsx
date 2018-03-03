import React from 'react';
import numeral from 'numeral';
import { belowBBMiddleOnAllInterval, downOnAllInterval } from 'app-utils';

const twoDecimals = number => numeral(number).format('00');
const toPercentage = dotPercentage => `${dotPercentage > 0 ? '+' : ''}${numeral(dotPercentage).format('0.00')}%`;
const toPercentageNoDecimal = dotPercentage => `${dotPercentage > 0 ? '+' : ''}${numeral(dotPercentage).format('0')}%`;

const MarketIndicatorsUpTrend = ({
  className,
  children,
  name,
  dailyChange,
  details: { error, fiveMin, hour, day },
}) => {
  const downTrend = downOnAllInterval(fiveMin, hour, day) || belowBBMiddleOnAllInterval(fiveMin, hour, day);
  const content = !error && !downTrend;
  return (
    <div className={className}>
      <div className="f3 fw7">{name}</div>
      <div className="f6 green">{toPercentage(dailyChange)}</div>
      {error && <div className="ba br2 b--red pv2 ph3 f6 mt2 red">{error}</div>}
      {downTrend && <div className="ba br2 b--orange pv2 ph3 f6 mt2 orange">Down trend</div>}
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
      {children}
    </div>
  );
};

export default MarketIndicatorsUpTrend;
