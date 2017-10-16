import { combineReducers } from 'redux';
import { returnChartData } from 'poloniex-js';

export const actionTypes = {
  LOAD_TICKS: 'ticks/LOAD_TICKS',
  SET_CURRENCY_PAIR: 'ticks/SET_CURRENCY_PAIR',
};

const LOAD_TICKS_START = 'ticks/LOAD_TICKS_START';
const LOAD_TICKS_SUCCESS = 'ticks/LOAD_TICKS_SUCCESS';
const LOAD_TICKS_FAILURE = 'ticks/LOAD_TICKS_FAILURE';

const loadTicksStart = () => ({
  type: LOAD_TICKS_START,
});

const loadTicksSuccess = data => ({
  type: LOAD_TICKS_SUCCESS,
  data,
});

const loadTicksFailure = err => ({
  type: LOAD_TICKS_FAILURE,
  error: err,
});

export const actions = {
  loadTicks: async (dispatch, getState) => {
    dispatch(loadTicksStart());

    try {
      const { ui } = getState().ticks;

      const options = {
        currencyPair: ui.currencyPair,
        period: ui.period,
        start: ui.start,
      };

      if (ui.end) {
        options.end = ui.end;
      }

      const { data } = await returnChartData(options);

      dispatch(loadTicksSuccess(data));
    } catch (err) {
      dispatch(loadTicksFailure(err));
    }
  },

  setCurrencyPair: currencyPair => (dispatch, getState) => {
    dispatch({
      type: actionTypes.SET_CURRENCY_PAIR,
      currencyPair,
    });

    actions.loadTicks(dispatch, getState);
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

const currencyPair = (state = 'USDT_BTC', action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENCY_PAIR:
      return action.currencyPair;
    default:
      return state;
  }
};

const period = (state = 7200) => state;

const start = (state = new Date('09/01/2017').getTime() / 1000) => state;

const end = (state = 9999999999) => state;

const ui = combineReducers({
  loading,
  error,
  currencyPair,
  period,
  start,
  end,
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
