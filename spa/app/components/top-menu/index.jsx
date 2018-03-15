import React from 'react';
import { connect } from 'react-redux';
import { globalSettingsChange as pageChangeAction } from 'app-actions/settings';

const activeModeClass = 'bb b--blue bw2';

const TopMenu = ({ className = '', page, globalSettingsChange }) => (
  <nav className={`${className} mt3 h2`}>
    <span
      className={`mr3 fr dib pointer ${page === 'ahihi' ? activeModeClass : ''}`}
      onClick={() => globalSettingsChange({ page: 'ahihi' })}
    >
      ahihi
    </span>
    <span
      className={`mr3 fr dib pointer ${page === 'bookmarks' ? activeModeClass : ''}`}
      onClick={() => globalSettingsChange({ page: 'bookmarks' })}
    >
      bookmarks
    </span>
    <span
      className={`mr3 fr dib pointer ${page === 'monitor' ? activeModeClass : ''}`}
      onClick={() => globalSettingsChange({ page: 'monitor' })}
    >
      monitor
    </span>
    <span
      className={`mr3 fr dib pointer ${page === 'indicators' ? activeModeClass : ''}`}
      onClick={() => globalSettingsChange({ page: 'indicators' })}
    >
      filter
    </span>
  </nav>
);

const mapStateToProps = ({ settings }) => ({
  ...settings,
});

const mapDispatchToProps = {
  globalSettingsChange: pageChangeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
