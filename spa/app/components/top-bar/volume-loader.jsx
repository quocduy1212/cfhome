import React from 'react';
import { connect } from 'react-redux';
import { filterByVolume } from 'app-actions/filters';

const VolumeLoader = ({ className, isLoading, onFiltering }) => (
  <header className={`${className} ph5 ph0-ns tc-ns`}>
    <span
      className={`db dib-ns ml4-ns mt4 mt0-ns ${isLoading ? 'light-gray' : 'pointer'}`}
      onClick={() => !isLoading && onFiltering()}
    >
      <i className="material-icons f2">play_arrow</i>
      <i className="material-icons f2 nl3">play_arrow</i>
    </span>
  </header>
);

const mapStateToProps = ({ volume }) => ({
  isLoading: volume.isLoading,
});

const mapDispatchToProps = {
  onFiltering: filterByVolume,
};

export default connect(mapStateToProps, mapDispatchToProps)(VolumeLoader);
