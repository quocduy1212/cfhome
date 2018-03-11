import { createSelector } from 'reselect';
import { globalSettings } from './settings';
import { sortByBB, sortByUpTrend } from './utils';

export const bookmarksList = ({ users }) => users.bookmarks;

export const processedBookmarks = ({ bookmarks }) => bookmarks.processed.map(b => ({ ...b, bookmarked: true }));

export const orderByBB = createSelector(processedBookmarks, processed => sortByBB(processed));

export const orderByUpTrend = createSelector(processedBookmarks, processed => sortByUpTrend(processed));

export const addBookmarkedFlag = (state, list) => {
  const bookmarks = bookmarksList(state);
  return list.map(m => ({
    ...m,
    bookmarked: bookmarks.findIndex(b => b.exchange === m.exchange && b.name === m.name) !== -1,
  }));
};

export const orderedData = createSelector(
  globalSettings,
  state => state,
  (settings, state) => (settings.displayMode === 'bb' ? orderByBB(state) : orderByUpTrend(state)),
);
