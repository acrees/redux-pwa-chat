import React from 'react'
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app.jsx';
import { root as reducer } from './reducers';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  loggerMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('app-container')
);
