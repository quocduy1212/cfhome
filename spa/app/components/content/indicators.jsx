import React from 'react';
import { connect } from 'react-redux';
import { orderedData } from 'app-selectors/indicators';
import { globalSettingsChange } from 'app-actions/settings';
import { addBookmark, removeBookmark } from 'app-actions/bookmarks';
import MarketList from './market-list';

const getLoadingMessage = (summary, { isProcessingCurrent, queue, processed, current }) => {
  if (summary.isLoading) {
    return 'Loading | Summary';
  } else if (isProcessingCurrent) {
    return `Loading | Indicators | ${processed.length + 1}/${processed.length + queue.length + 1} | ${current.name}`;
  }
  return '';
};

const Content = props => <MarketList {...props} />;

const mapStateToProps = state => ({
  loadingMessage: getLoadingMessage(state.summary, state.indicators),
  displayMode: state.settings.displayMode,
  reordered: orderedData(state),
});

export default connect(mapStateToProps, {
  onDisplayModeChange: globalSettingsChange,
  onAddBookmark: addBookmark,
  onRemoveBookmark: removeBookmark,
})(Content);
