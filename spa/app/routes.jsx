import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/app';
import Game from './components/pages/game';
import NotFound from './components/pages/not-found';
import { CfHome, CfAdmin } from './components/cfhome';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="cfhome" />
    <Route component={Game}>
      <Route path="cfhome" component={CfHome} />
      <Route path="admin" component={CfAdmin} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
