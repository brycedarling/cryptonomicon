import React from 'react';
import renderer from 'react-test-renderer';
import { scaleLinear } from 'd3-scale';
import Axis from './Axis';

describe('components', () => {
  describe('Axis', () => {
    it('renders correctly', () => {
      const tree = renderer.create((
        <Axis
          label={{ text: 'Volume', transform: 'rotate(-90)' }}
          className="y-axis"
          orientation="left"
          scale={scaleLinear()}
        />
      )).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
