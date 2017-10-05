import { combineReducers } from 'redux';
import { returnChartData } from 'poloniex-js';

export const actionTypes = {
  LOAD_TICKS: 'ticks/LOAD_TICKS',
};

const LOAD_TICKS_START = 'ticks/LOAD_TICKS_START';
const LOAD_TICKS_SUCCESS = 'ticks/LOAD_TICKS_SUCCESS';
const LOAD_TICKS_FAILURE = 'ticks/LOAD_TICKS_FAILURE';

const loadTicksStart = () => ({
  type: LOAD_TICKS_START,
});

const loadTicksSuccess = data => ({
  type: LOAD_TICKS_SUCCESS,
  data: data,
});

const loadTicksFailure = err => ({
  type: LOAD_TICKS_FAILURE,
  error: err,
});

export const actions = {
  loadTicks: (options) => async(dispatch) => {
    dispatch(loadTicksStart());

    try {
      const { data } = await returnChartData(options);

      dispatch(loadTicksSuccess(data));
    } catch (err) {
      dispatch(loadTicksFailure(err));
    }
  },
};

const loading = (state = false, action) => {
  switch (action.type) {
    case LOAD_TICKS_START:
      return true;
    case LOAD_TICKS_SUCCESS:
      return false;
    case LOAD_TICKS_FAILURE:
      return false;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case LOAD_TICKS_START:
      return null;
    case LOAD_TICKS_SUCCESS:
      return null;
    case LOAD_TICKS_FAILURE:
      return action.error;
    default:
      return state;
  }
};

const ui = combineReducers({
  loading,
  error,
});

const data = (state = [], action) => {
  switch (action.type) {
    case LOAD_TICKS_START:
      return state;
    case LOAD_TICKS_SUCCESS:
      return action.data;
    case LOAD_TICKS_FAILURE:
      return state;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  ui,
});
