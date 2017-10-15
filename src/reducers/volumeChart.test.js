import volumeChartReducer from './volumeChart';

describe('reducers', () => {
  describe('volumeChart', () => {
    describe('when action type is UNDEFINED', () => {
      it('returns the initial state with default data and ui values', () => {
        const expected = {
          data: [],
          ui: {
            currencyPair: 'USDT_BTC',
            period: 86400,
            start: 1483246800, // Jan 01, 2017
            end: 9999999999,
          },
        };

        const actual = volumeChartReducer(undefined, { type: 'UNDEFINED' });

        expect(actual).toEqual(expected);
      });
    });
  });
});
