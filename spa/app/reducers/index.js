import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import game from './game';
import setting from './setting';
import stats from './stats';

const rootReducer = combineReducers({
  game,
  setting,
  stats,
  routing,
});

export default rootReducer;
