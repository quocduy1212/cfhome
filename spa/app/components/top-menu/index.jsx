import React from 'react';
import { connect } from 'react-redux';
import { globalSettingsChange as pageChangeAction } from 'app-actions/settings';

const activeModeClass = 'bb b--blue bw2';

const TopMenu = ({ className = '', page, globalSettingsChange, admin }) => (
  <nav className={`${className} mt3 h2`}>
    {admin && (
      <span
        className={`mr2 fr dib pointer ${page === 'alpha' ? activeModeClass : ''}`}
        onClick={() => globalSettingsChange({ page: 'alpha' })}
      >
        alpha
      </span>
    )}
    <span
      className={`mr2 fr dib pointer ${page === 'products' ? activeModeClass : ''}`}
      onClick={() => globalSettingsChange({ page: 'products' })}
    >
      products
    </span>
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
