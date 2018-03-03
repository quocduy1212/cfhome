import { createSelector } from 'reselect';
import {
  errorDetails,
  aboveBBUpperOnAllDetails,
  aboveBBMiddleOnAllDetails,
  aboveBBMiddleOnHourFiveMinDetails,
  belowBBMiddleOnAllIntervalDetails,
  downOnAllIntervalDetails,
  upOnAllIntervalDetails,
  upOnHourFiveMinIntervalDetails,
} from 'app-utils';
import { indicatorsSettings } from './settings';

export const processedIndicators = ({ indicators }) => indicators.processed;

export const orderByBB = createSelector(processedIndicators, processed => {
  const errors = [];
  const first = [];
  const second = [];
  processed.forEach(m => {
    if (errorDetails(m.details)) {
      errors.push(m);
    } else if (aboveBBUpperOnAllDetails(m.details)) {
      first.push(m);
    } else {
      second.push(m);
    }
  });
  return [...first, ...second, ...errors];
});

export const orderByUpTrend = createSelector(processedIndicators, processed => {
  const last = [];
  const allUp = [];
  const allAboveAndAllUp = [];
  const allAbove = [];
  const mixed = [];
  processed.forEach(m => {
    if (errorDetails(m.details)) {
      last.push(m);
    } else if (aboveBBMiddleOnAllDetails(m.details) && upOnAllIntervalDetails(m.details)) {
      allAboveAndAllUp.push(m);
    } else if (upOnAllIntervalDetails(m.details) && !belowBBMiddleOnAllIntervalDetails(m.details)) {
      allUp.push(m);
    } else if (aboveBBMiddleOnAllDetails(m.details) && !downOnAllIntervalDetails(m.details)) {
      allAbove.push(m);
    } else if (belowBBMiddleOnAllIntervalDetails(m.details) || downOnAllIntervalDetails(m.details)) {
      last.push({ ...m, hide: true });
    } else {
      mixed.push(m);
    }
  });
  const mixedFirst = [];
  const mixedSecond = [];
  const mixedLast = [];
  mixed.forEach(m => {
    if (aboveBBMiddleOnHourFiveMinDetails(m.details)) {
      mixedFirst.push(m);
    } else if (upOnHourFiveMinIntervalDetails(m.details)) {
      mixedSecond.push(m);
    } else {
      mixedLast.push({ ...m, hide: true });
    }
  });
  return [...allAboveAndAllUp, ...allUp, ...allAbove, ...[...mixedFirst, ...mixedSecond, ...mixedLast], ...last];
});

export const orderedData = state => {
  const settings = indicatorsSettings(state);
  return settings.displayMode === 'bb' ? orderByBB(state) : orderByUpTrend(state);
};
