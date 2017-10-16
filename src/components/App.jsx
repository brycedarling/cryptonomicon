import React from 'react';
import { Provider } from 'react-redux';
import CandlestickChart from './CandlestickChart';
import VolumeChart from './VolumeChart';
import configureStore from '../configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <div>
      <CandlestickChart
        width={600}
        height={270}
        margin={{
          top: 30, right: 20, bottom: 30, left: 50,
        }}
      />
      <VolumeChart
        width={600}
        height={270}
        margin={{
          top: 30, right: 20, bottom: 30, left: 50,
        }}
      />
    </div>
  </Provider>
);

export default App;
