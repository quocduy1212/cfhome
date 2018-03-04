import React from 'react';
import TopMenu from 'app-comps/top-menu';

const GuessLayout = ({ className = '' }) => (
  <main className={className}>
    <TopMenu className="mv3" />
    <hr className="bt b--light-gray mt3" />
  </main>
);

export default GuessLayout;
