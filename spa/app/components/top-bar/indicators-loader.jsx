import React from 'react';
import { connect } from 'react-redux';
import { loadBookmarksIndicators } from 'app-actions/bookmarks';

const IndicatorsLoader = ({ className, isProcessing, emptyBookmarkList, onFiltering }) => (
  <header className={`${className} ph5 ph0-ns tc-ns`}>
    <span
      className={`db dib-ns ml4-ns mt4 mt0-ns ${isProcessing || emptyBookmarkList ? 'light-gray' : 'pointer'}`}
      onClick={() => !isProcessing && onFiltering()}
    >
      <i className="material-icons f2">play_arrow</i>
      <i className="material-icons f2 nl3">play_arrow</i>
    </span>
  </header>
);

const mapStateToProps = ({ bookmarks }) => ({
  isProcessing: bookmarks.isProcessingCurrent,
  emptyBookmarkList: bookmarks.bookmarks.length <= 0,
});

const mapDispatchToProps = {
  onFiltering: loadBookmarksIndicators,
};

export default connect(mapStateToProps, mapDispatchToProps)(IndicatorsLoader);
