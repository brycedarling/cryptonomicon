import * as poloniexApi from 'poloniex-js';
import ticksReducer, { actions, actionTypes } from './ticks';

jest.mock('poloniex-js');

describe('reducers', () => {
  describe('ticks', () => {
    describe('when action type is UNDEFINED', () => {
      it('returns the initial state with default data and ui values', () => {
        const expected = {
          data: [],
          ui: {
            loading: false,
            error: null,
            currencyPair: 'USDT_BTC',
            period: 7200,
            start: 1504238400, // Sep 01, 2017
            end: 9999999999,
          },
        };

        const actual = ticksReducer(undefined, { type: 'UNDEFINED' });

        expect(actual).toEqual(expected);
      });
    });

    describe('when action type is LOAD_TICKS_START', () => {
      it('sets loading to true and error to null', () => {
        const data = [{
          open: 2, high: 4, low: 1, close: 3,
        }];

        const initialState = {
          data,
          ui: {
            error: 'hi mom',
            loading: false,
          },
        };

        const expected = {
          data,
          ui: {
            error: null,
            loading: true,
            currencyPair: 'USDT_BTC',
            period: 7200,
            start: 1504238400, // Sep 01, 2017
            end: 9999999999,
          },
        };

        const actual = ticksReducer(initialState, {
          type: 'ticks/LOAD_TICKS_START',
        });

        expect(actual).toEqual(expected);
      });
    });

    describe('when action type is LOAD_TICKS_SUCCESS', () => {
      it('sets data, loading to false, and clears error', () => {
        const initialState = {
          data: [],
          ui: {
            error: 'hi mom',
            loading: true,
          },
        };

        const data = [{
          open: 2, high: 4, low: 1, close: 3,
        }];

        const expected = {
          data,
          ui: {
            error: null,
            loading: false,
            currencyPair: 'USDT_BTC',
            period: 7200,
            start: 1504238400, // Sep 01, 2017
            end: 9999999999,
          },
        };

        const actual = ticksReducer(initialState, {
          type: 'ticks/LOAD_TICKS_SUCCESS',
          data,
        });

        expect(actual).toEqual(expected);
      });
    });

    describe('when action type is LOAD_TICKS_FAILURE', () => {
      it('sets error and loading to false', () => {
        const data = [{
          open: 2, high: 4, low: 1, close: 3,
        }];

        const initialState = {
          data,
          ui: {
            error: null,
            loading: true,
          },
        };

        const err = 'network error';

        const expected = {
          data,
          ui: {
            error: err,
            loading: false,
            currencyPair: 'USDT_BTC',
            period: 7200,
            start: 1504238400, // Sep 01, 2017
            end: 9999999999,
          },
        };

        const actual = ticksReducer(initialState, {
          type: 'ticks/LOAD_TICKS_FAILURE',
          error: err,
        });

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('action creators', () => {
    const actual = [];

    const dispatch = action => actual.push(action);

    const getState = () => ({
      ticks: {
        data: [],
        ui: {
          loading: false,
          error: null,
          currencyPair: 'USDT_BTC',
          period: 7200,
          start: 1504238400,
          end: 9999999999,
        },
      },
    });

    beforeEach(() => {
      actual.length = 0;
    });

    describe('loadTicks', () => {
      const options = {
        currencyPair: 'USDT_BTC',
        period: 7200,
        start: 1504238400,
        end: 9999999999,
      };

      describe('when successful', () => {
        const data = [{
          close: 244,
          date: 1424304000,
          high: 0.33,
          low: 225,
          open: 0.33,
          quoteVolume: 0.19311748,
          volume: 46.27631267,
          weightedAverage: 239.62777823,
        }];

        const spy = jest.spyOn(poloniexApi, 'returnChartData');

        beforeEach(() => {
          spy.mockImplementationOnce(() => Promise.resolve({ data }));
        });

        it('calls returnChartData with the given options', async () => {
          await actions.loadTicks(dispatch, getState);

          expect(spy).toBeCalledWith(options);
        });

        it('dispatches start and success actions', async () => {
          const expected = [
            { type: 'ticks/LOAD_TICKS_START' },
            { type: 'ticks/LOAD_TICKS_SUCCESS', data },
          ];

          await actions.loadTicks(dispatch, getState);

          expect(actual).toEqual(expected);
        });
      });

      describe('when failure occurs', () => {
        const err = 'network error';

        const spy = jest.spyOn(poloniexApi, 'returnChartData');

        beforeEach(() => spy.mockImplementationOnce(() => Promise.reject(err)));

        it('calls returnChartData with the given options', async () => {
          await actions.loadTicks(dispatch, getState);

          expect(spy).toBeCalledWith(options);
        });

        it('dispatches start and failure actions', async () => {
          const expected = [
            { type: 'ticks/LOAD_TICKS_START' },
            { type: 'ticks/LOAD_TICKS_FAILURE', error: err },
          ];

          await actions.loadTicks(dispatch, getState);

          expect(actual).toEqual(expected);
        });
      });
    });

    describe('setCurrencyPair', () => {
      it('returns a SET_CURRENCY_PAIR action', () => {
        const currencyPair = 'USDT_ETH';

        const expected = [{
          type: actionTypes.SET_CURRENCY_PAIR,
          currencyPair,
        }, {
          type: 'ticks/LOAD_TICKS_START',
        }];

        actions.setCurrencyPair(currencyPair)(dispatch, getState);

        expect(actual).toEqual(expected);
      });
    });
  });
});
