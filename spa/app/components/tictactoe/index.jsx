import React from 'react';
import { connect } from 'react-redux';
import IndicatorsLayout from './indicators-layout';
import BookmarksLayout from './bookmarks-layout';
import AhihiLayout from './ahihi-layout';
import GuessLayout from './guess-layout';

const TicTacToe = ({ page }) => {
  if (page === 'indicators') {
    return <IndicatorsLayout />;
  } else if (page === 'bookmarks') {
    return <BookmarksLayout />;
  } else if (page === 'ahihi') {
    return <AhihiLayout />;
  }
  return <GuessLayout />;
};

const mapStateToProps = ({ settings }) => ({
  ...settings,
});

export default connect(mapStateToProps, null)(TicTacToe);
