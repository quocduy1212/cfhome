import numeral from 'numeral';

export const twoDecimalsInNumber = value => Math.round(value * 100) / 100;
export const commaThousandSeparated = value => numeral(value).format('0,0.00');
export const twoDecimals = number => numeral(number).format('00');
export const toPercentage = dotPercentage => `${dotPercentage > 0 ? '+' : ''}${numeral(dotPercentage).format('0.00')}%`;
export const toPercentageNoDecimal = dotPercentage =>
  `${dotPercentage > 0 ? '+' : ''}${numeral(dotPercentage).format('0')}%`;
export const bellowBBUpper = (fiveMin, hour, day) => fiveMin.bb.upper <= 0 && hour.bb.upper <= 0 && day.bb.upper <= 0;
export const bellowBBUpperDetails = ({ fiveMin, hour, day }) => bellowBBUpper(fiveMin, hour, day);
export const aboveBBUpperOnAllDetails = ({ fiveMin, hour, day }) =>
  fiveMin.bb.upper > 0 && hour.bb.upper > 0 && day.bb.upper > 0;
export const errorDetails = details => !!details.error;
export const aboveBBMiddleOnAllDetails = ({ fiveMin, hour, day }) =>
  fiveMin.bb.middle > 0 && hour.bb.middle > 0 && day.bb.middle > 0;
export const aboveBBMiddleOnHourFiveMinDetails = ({ fiveMin, hour }) => fiveMin.bb.middle > 0 && hour.bb.middle > 0;
export const aboveBBMiddleOnFiveMinDetails = ({ fiveMin }) => fiveMin.bb.middle > 0;
export const belowBBMiddleOnAllInterval = (fiveMin, hour, day) =>
  fiveMin.bb.middle <= 0 && hour.bb.middle <= 0 && day.bb.middle <= 0;
export const belowBBMiddleOnAllIntervalDetails = ({ fiveMin, hour, day }) =>
  fiveMin.bb.middle <= 0 && hour.bb.middle <= 0 && day.bb.middle <= 0;
export const upOnAllIntervalDetails = ({ fiveMin, hour, day }) => fiveMin.up > 0 && hour.up > 0 && day.up > 0;
export const upOnHourFiveMinIntervalDetails = ({ fiveMin, hour }) => fiveMin.up > 0 && hour.up > 0;
export const upOnFiveMinIntervalDetails = ({ fiveMin }) => fiveMin.up > 0;
export const downOnAllIntervalDetails = ({ fiveMin, hour, day }) => fiveMin.up <= 0 && hour.up <= 0 && day.up <= 0;
export const downOnAllInterval = (fiveMin, hour, day) => fiveMin.up <= 0 && hour.up <= 0 && day.up <= 0;
export const timestampToTime = timestamp => {
  const d = new Date(timestamp * 1000);
  return `${twoDecimals(d.getHours())}:${twoDecimals(d.getMinutes())}:${twoDecimals(d.getSeconds())}`;
};
export const timestampToDate = timestamp => {
  const d = new Date(timestamp * 1000);
  return `${twoDecimals(d.getDate())}-${twoDecimals(d.getMonth() + 1)}-${d.getFullYear()}`;
};
