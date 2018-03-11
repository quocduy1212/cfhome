/* eslint-disable global-require */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import 'app-vendor';
import 'app-styles/main';

import configureStore from './store/configure-store';
import Root from './root';
import { initialize } from './game/initializer';

const store = configureStore({});
const history = syncHistoryWithStore(browserHistory, store);

// global configuration before starting
initialize();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('main-container'),
);

export { store };

if (module.hot) {
  module.hot.accept('./root', () => {
    const NewRoot = require('./root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('main-container'),
    );
  });
}
