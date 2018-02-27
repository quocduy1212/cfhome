import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/app';
import Game from './components/pages/game';
import NotFound from './components/pages/not-found';
import TicTacToe from './components/tictactoe';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="tictactoe" />
    <Route component={Game}>
      <Route path="tictactoe" component={TicTacToe} />
    </Route>
    <Route path="*" component={NotFound} />
  </Route>
);
