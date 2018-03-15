import React from 'react';
import TopMenu from 'app-comps/top-menu';
import MonitorLoader from 'app-comps/top-bar/monitor-loader';
import Content from 'app-comps/content/monitor';

const MonitorLayout = ({ className = '' }) => (
  <main className={className}>
    <TopMenu className="mv3" />
    <MonitorLoader className="mv3" />
    <hr className="bt b--light-gray mt3" />
    <Content className="ph2 ph7-ns ph4-m" />
  </main>
);

export default MonitorLayout;
