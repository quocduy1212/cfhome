import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import summary from './summary';
import indicators from './indicators';
import settings from './settings';
import bookmarks from './bookmarks';
import monitor from './monitor';
import users from './users';

const rootReducer = combineReducers({
  summary,
  indicators,
  settings,
  bookmarks,
  monitor,
  users,
  routing,
});

export default rootReducer;
