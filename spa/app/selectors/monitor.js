import { createSelector } from 'reselect';
import { globalSettings } from './settings';
import { addBookmarkedFlag } from './bookmarks';
import { sortByBB, sortByUpTrend } from './utils';

export const processedIndicators = ({ monitor }) => monitor.processed;

export const orderByBB = createSelector(processedIndicators, processed => sortByBB(processed));

export const orderByUpTrend = createSelector(processedIndicators, processed => sortByUpTrend(processed));

export const orderedData = createSelector(
  globalSettings,
  state => state,
  (settings, state) => {
    const ordered = settings.displayMode === 'bb' ? orderByBB(state) : orderByUpTrend(state);
    return addBookmarkedFlag(state, ordered);
  },
);
