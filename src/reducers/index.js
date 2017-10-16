import { combineReducers } from 'redux';
import ticks from './ticks';

export { actions } from './ticks';

export default combineReducers({
  ticks,
});
