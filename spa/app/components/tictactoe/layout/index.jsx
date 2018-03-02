import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import TopBar from 'app-comps/top-bar';
import Content from 'app-comps/content';
import './layout.scss';

const GameLayout = ({ className }) => (
  <main className={className}>
    <ReactTooltip effect="solid" />
    <TopBar className="mv3 tc" />
    <Content className="ph2 ph7-ns" />
  </main>
);
GameLayout.propTypes = {
  className: PropTypes.string,
};

GameLayout.defaultProps = {
  className: '',
};

export default GameLayout;
