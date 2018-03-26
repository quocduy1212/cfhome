import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import summary from './summary';
import indicators from './indicators';
import settings from './settings';
import bookmarks from './bookmarks';
import monitor from './monitor';
import users from './users';
import volume from './volume';

const rootReducer = combineReducers({
  summary,
  indicators,
  settings,
  bookmarks,
  monitor,
  users,
  volume,
  routing,
});

export default rootReducer;
