import React from 'react';
import { connect } from 'react-redux';
import { orderedData } from 'app-selectors/monitor';
import { globalSettingsChange } from 'app-actions/settings';
import { addBookmark, removeBookmark } from 'app-actions/bookmarks';
import MarketsList from './markets-list';

const getLoadingMessage = ({ isProcessingCurrent, queue, processed, current }) =>
  isProcessingCurrent
    ? `Loading | ${processed.length + 1}/${processed.length + queue.length + 1} | ${current.name} | ${current.exchange}`
    : '';

const CHARTS = {
  historyCount: true,
  bbCount: true,
  bbChart: true,
  orderBookChart: true,
  dayPricesChart: true,
  volumeChart: true,
};

const Content = props => <MarketsList {...props} charts={CHARTS} />;

const mapStateToProps = state => ({
  loadingMessage: getLoadingMessage(state.monitor),
  displayMode: state.settings.displayMode,
  reordered: orderedData(state),
});

export default connect(mapStateToProps, {
  onDisplayModeChange: globalSettingsChange,
  onAddBookmark: addBookmark,
  onRemoveBookmark: removeBookmark,
})(Content);
