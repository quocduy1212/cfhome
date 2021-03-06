import React from 'react';
import { connect } from 'react-redux';
import { orderedData } from 'app-selectors/bookmarks';
import { globalSettingsChange } from 'app-actions/settings';
import { addBookmark, removeBookmark } from 'app-actions/bookmarks';
import MarketsList from './markets-list';
import BookmarksList from './bookmarks-list';

const getLoadingMessage = ({ isProcessingCurrent, queue, processed, current }) =>
  isProcessingCurrent
    ? `Loading | ${processed.length + 1}/${processed.length + queue.length + 1} | ${current.name} | ${current.exchange}`
    : '';

const CHARTS = {
  historyCount: true,
  bbCount: true,
  bbChart: true,
  stoChart: true,
  orderBookChart: true,
  dayPricesChart: true,
  volumeChart: true,
};

const Content = props =>
  props.workingOnBookmarks ? (
    <MarketsList {...props} charts={CHARTS} />
  ) : (
    <BookmarksList className={props.className} bookmarks={props.bookmarks} onRemoveBookmark={props.onRemoveBookmark} />
  );

const mapStateToProps = state => ({
  loadingMessage: getLoadingMessage(state.bookmarks),
  workingOnBookmarks: state.bookmarks.processed.length > 0 || state.bookmarks.isProcessingCurrent,
  bookmarks: state.users.bookmarks,
  displayMode: state.settings.displayMode,
  reordered: orderedData(state),
});

export default connect(mapStateToProps, {
  onDisplayModeChange: globalSettingsChange,
  onAddBookmark: addBookmark,
  onRemoveBookmark: removeBookmark,
})(Content);
