import React from 'react';
import renderer from 'react-test-renderer';
import Line from './Line';

describe('components', () => {
  describe('Line', () => {
    it('renders correctly', () => {
      const data = [{
        date: new Date('01/01/2017'),
        open: 1,
        close: 2,
        high: 3,
        low: 0,
        volume: 1,
        quoteVolume: 2,
        weightedAverage: 3,
      }, {
        date: new Date('02/01/2017'),
        open: 2,
        close: 3,
        high: 4,
        low: 1,
        volume: 2,
        quoteVolume: 3,
        weightedAverage: 4,
      }];

      const x = d => d.date;

      const y = d => d.volume;

      const tree = renderer.create((
        <Line
          x={x}
          y={y}
          data={data}
        />
      )).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
