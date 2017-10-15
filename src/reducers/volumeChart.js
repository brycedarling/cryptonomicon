import { combineReducers } from 'redux';

const currencyPair = (state = 'USDT_BTC', action) => {
  return state;
};

const period = (state = 86400, action) => {
  return state;
};

const start = (state = new Date('01/01/2017').getTime() / 1000, action) => {
  return state;
};

const end = (state = 9999999999, action) => {
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
