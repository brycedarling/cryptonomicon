import { combineReducers } from 'redux';

const currencyPair = (state = 'USDT_BTC', action) => {
  return state;
};

const period = (state = 86400, action) => {
  return state;
};

const start = (state = 0, action) => {
  return state;
};

const end = (state = null, action) => {
  return state;
};

const ui = combineReducers({
  currencyPair,
  period,
  start,
  end,
});

const data = (state = [], action) => {
  return state;
};

export default combineReducers({
  data,
  ui,
});
