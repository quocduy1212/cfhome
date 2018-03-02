import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import summary from './summary';
import indicators from './indicators';

const rootReducer = combineReducers({
  summary,
  indicators,
  routing,
});

export default rootReducer;
