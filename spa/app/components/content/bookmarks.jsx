import React from 'react';
import { connect } from 'react-redux';
import { orderedData } from 'app-selectors/bookmarks';
import { globalSettingsChange } from 'app-actions/settings';
import { addBookmark, removeBookmark } from 'app-actions/bookmarks';
import MarketList from './market-list';
import BookmarkList from './bookmark-list';

const getLoadingMessage = ({ isProcessingCurrent, queue, processed, current }) =>
  isProcessingCurrent
    ? `Loading | ${processed.length + 1}/${processed.length + queue.length + 1} | ${current.name} | ${current.exchange}`
    : '';

const Content = props =>
  props.workingOnBookmarks ? (
    <MarketList {...props} />
  ) : (
    <BookmarkList className={props.className} bookmarks={props.bookmarks} onRemoveBookmark={props.onRemoveBookmark} />
  );

const mapStateToProps = state => ({
  loadingMessage: getLoadingMessage(state.bookmarks),
  workingOnBookmarks: state.bookmarks.processed.length > 0 || state.bookmarks.isProcessingCurrent,
  bookmarks: state.bookmarks.bookmarks,
  displayMode: state.settings.displayMode,
  reordered: orderedData(state),
});

export default connect(mapStateToProps, {
  onDisplayModeChange: globalSettingsChange,
  onAddBookmark: addBookmark,
  onRemoveBookmark: removeBookmark,
})(Content);
