import React from 'react';
import renderer from 'react-test-renderer';
import Margin from './Margin';

describe('components', () => {
  describe('Margin', () => {
    it('renders correctly', () => {
      const tree = renderer.create((
        <Margin
          top={10}
          left={20}
          bottom={30}
          right={40}
        >
          hi mom
        </Margin>
      )).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
