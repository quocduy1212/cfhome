import React from 'react';
import { connect } from 'react-redux';
import { globalSettingsChange } from 'app-actions/settings';

const activeModeClass = 'bb b--blue bw2';

const SortBar = ({ className = '', displayMode, onDisplayModeChange }) => (
  <div className={`tr mt4 mr3 ${className}`}>
    <span
      className={`dib f4 pointer ${displayMode === 'up_trend' ? activeModeClass : ''}`}
      onClick={() => onDisplayModeChange({ displayMode: 'up_trend' })}
    >
      Up Trend
    </span>
    <span
      className={`dib f4 ml4 pointer ${displayMode === 'bb' ? activeModeClass : ''}`}
      onClick={() => onDisplayModeChange({ displayMode: 'bb' })}
    >
      BB
    </span>
  </div>
);

SortBar.defaultProps = {
  onDisplayModeChange: () => {},
};

const mapStateToProps = ({ settings }) => ({
  displayMode: settings.displayMode,
});

export default connect(mapStateToProps, {
  onDisplayModeChange: globalSettingsChange,
})(SortBar);
