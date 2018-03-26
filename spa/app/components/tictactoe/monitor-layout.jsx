import React from 'react';
import TopMenu from 'app-comps/top-menu';
import MonitorLoader from 'app-comps/top-bar/monitor-loader';
import Content from 'app-comps/content/monitor';
import { SortBar } from 'app-comps-common';

const MonitorLayout = ({ className = '' }) => (
  <main className={className}>
    <TopMenu className="mv3" />
    <MonitorLoader className="mv3" />
    <hr className="bt b--light-gray mt3" />
    <SortBar />
    <Content className="ph2" />
  </main>
);

export default MonitorLayout;
