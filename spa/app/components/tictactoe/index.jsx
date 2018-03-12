import React from 'react';
import { connect } from 'react-redux';
import IndicatorsLayout from './indicators-layout';
import BookmarksLayout from './bookmarks-layout';
import AhihiLayout from './ahihi-layout';

const TicTacToe = ({ page }) => (
  <div>
    <IndicatorsLayout className={page === 'indicators' ? 'db' : 'dn'} />
    <BookmarksLayout className={page === 'bookmarks' ? 'db' : 'dn'} />
    <AhihiLayout className={page === 'ahihi' ? 'db' : 'dn'} />
  </div>
);

const mapStateToProps = ({ settings }) => ({
  ...settings,
});

export default connect(mapStateToProps, null)(TicTacToe);
