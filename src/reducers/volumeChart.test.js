import volumeChartReducer from './volumeChart';

describe('reducers', () => {
  describe('volumeChart', () => {
    describe('when action type is UNDEFINED', () => {
      it('returns the initial state with default data and ui values', () => {
        const expected = {
          data: [],
          ui: {
            currencyPair: 'USDT_BTC',
            period: 7200,
            start: 1504238400, // Sep 01, 2017
            end: 9999999999,
          },
        };

        const actual = volumeChartReducer(undefined, { type: 'UNDEFINED' });

        expect(actual).toEqual(expected);
      });
    });
  });
});
