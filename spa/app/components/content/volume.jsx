import React from 'react';
import { connect } from 'react-redux';
import { addBookmark, removeBookmark } from 'app-actions/bookmarks';
import { addBookmarkedFlag } from 'app-selectors/bookmarks';
import MarketsList from './markets-list';

const CHARTS = {
  dayPricesChart: true,
  volumeChart: true,
};

const Content = props => <MarketsList {...props} charts={CHARTS} />;

const mapStateToProps = state => ({
  loadingMessage: state.volume.isLoading ? 'Loading volume' : '',
  reordered: addBookmarkedFlag(state, state.volume.data),
});

export default connect(mapStateToProps, {
  onAddBookmark: addBookmark,
  onRemoveBookmark: removeBookmark,
})(Content);
