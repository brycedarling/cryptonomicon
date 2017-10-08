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
        <VolumeChart />
      </Provider>
    );
  }
}

export default App;
