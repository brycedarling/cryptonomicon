import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import rootReducer, { actions } from './reducers';

window.actions = actions;

const store = createStore(rootReducer);

window.store = store;

store.subscribe(() => {
  const state = store.getState();
  console.log('data', state.ticks.data);
  console.log('ui', state.ticks.ui.loading, state.ticks.ui.error);
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
