import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const configureStore = () => {
  const initialState = {};

  const enhancers = [];

  const middleware = [
    thunk,
  ];

  if (process.env.NODE_ENV === 'development') {
    const { __REDUX_DEVTOOLS_EXTENSION__ } = window;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers,
  );

  const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
  );

  return store;
};

export default configureStore;
