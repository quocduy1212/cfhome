import React from 'react';
import { connect } from 'react-redux';
import { globalSettingsChange as pageChangeAction } from 'app-actions/settings';

const activeModeClass = 'bb b--blue bw2';

const TopMenu = ({ className = '', page, globalSettingsChange, validated }) => (
  <nav className={`${className} mt3 h2`}>
    <span
      className={`mr2 fr dib pointer ${page === 'alpha' ? activeModeClass : ''}`}
      onClick={() => globalSettingsChange({ page: 'alpha' })}
    >
      alpha
    </span>
    {validated && (
      <span
        className={`mr2 fr dib pointer ${page === 'volume' ? activeModeClass : ''}`}
        onClick={() => globalSettingsChange({ page: 'volume' })}
      >
        volume
      </span>
    )}
    {validated && (
      <span
        className={`mr2 fr dib pointer ${page === 'bookmarks' ? activeModeClass : ''}`}
        onClick={() => globalSettingsChange({ page: 'bookmarks' })}
      >
        bookmarks
      </span>
    )}
    {validated && (
      <span
        className={`mr2 fr dib pointer ${page === 'monitor' ? activeModeClass : ''}`}
        onClick={() => globalSettingsChange({ page: 'monitor' })}
      >
        monitor
      </span>
    )}
    {validated && (
      <span
        className={`mr2 fr dib pointer ${page === 'indicators' ? activeModeClass : ''}`}
        onClick={() => globalSettingsChange({ page: 'indicators' })}
      >
        filter
      </span>
    )}
  </nav>
);

const mapStateToProps = ({ settings, users }) => ({
  ...settings,
  validated: users.validated,
});

const mapDispatchToProps = {
  globalSettingsChange: pageChangeAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopMenu);
