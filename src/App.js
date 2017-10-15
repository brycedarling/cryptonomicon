import React, { Component } from 'react';
import { Provider } from 'react-redux';
import VolumeChart from './components/VolumeChart';
import configureStore from './configureStore';
import './App.css';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <VolumeChart
          width={600}
          height={270}
          margin={{top: 30, right: 20, bottom: 30, left: 50,}}
        />
      </Provider>
    );
  }
}

export default App;
