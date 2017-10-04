import { combineReducers } from 'redux';
import ticks, { actions } from './ticksReducer';
export { actions } from './ticksReducer';

export default combineReducers({
  ticks,
});
