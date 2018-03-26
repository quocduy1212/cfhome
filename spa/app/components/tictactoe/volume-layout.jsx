import React from 'react';
import TopMenu from 'app-comps/top-menu';
import VolumeLoader from 'app-comps/top-bar/volume-loader';
import Content from 'app-comps/content/volume';

const VolumeLayout = ({ className = '' }) => (
  <main className={className}>
    <TopMenu className="mv3" />
    <VolumeLoader className="mv3" />
    <hr className="bt b--light-gray mt3" />
    <Content className="ph2" />
  </main>
);

export default VolumeLayout;
