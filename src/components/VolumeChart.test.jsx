import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import VolumeChart from './VolumeChart';
import configureStore from '../configureStore';

describe('components', () => {
  describe('VolumeChart', () => {
    it('renders correctly', () => {
      const store = configureStore();

      const tree = renderer.create((
        <Provider store={store}>
          <VolumeChart
            width={600}
            height={270}
            margin={{
              top: 30, right: 20, bottom: 30, left: 50,
            }}
          />
        </Provider>
      )).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
