import React from 'react';
import TopMenu from 'app-comps/top-menu';

const AhihiLayout = ({ className = '' }) => (
  <main className={className}>
    <TopMenu className="mv3" />
  </main>
);

export default AhihiLayout;
