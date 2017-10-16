import { combineReducers } from 'redux';
import ticks from './ticks';
import volumeChart from './volumeChart';

export { actions } from './ticks';

export default combineReducers({
  ticks,
  volumeChart,
});
