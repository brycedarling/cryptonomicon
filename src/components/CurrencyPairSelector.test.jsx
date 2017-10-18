import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import CurrencyPairSelector from './CurrencyPairSelector';
import configureStore from '../configureStore';

describe('components', () => {
  describe('CurrencyPairSelector', () => {
    it('renders correctly', () => {
      const store = configureStore();

      const tree = renderer.create((
        <Provider store={store}>
          <CurrencyPairSelector />
        </Provider>
      )).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
