import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import summary from './summary';
import indicators from './indicators';
import settings from './settings';

const rootReducer = combineReducers({
  summary,
  indicators,
  settings,
  routing,
});

export default rootReducer;
