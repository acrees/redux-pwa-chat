import React from 'react'
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app';
import { root as reducer } from './reducers';
import * as locals from './page.styl';
import { setCode, sentMessage, newMessage } from './actions';

const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

const store = createStoreWithMiddleware(reducer);

render(
  <Provider store={store}>
    <App></App>
  </Provider>,
  document.getElementById('app-container')
);

var socket = io.connect(window.location.host);

socket.on('set-code', (m) => {
  store.dispatch(setCode(m.code));
});

socket.on('sent-message', (m) => {
  store.dispatch(sentMessage(m.id));
});

socket.on('recieve-message', (m) => {
  m.sent = true;
  store.dispatch(newMessage(m));
});

window.socket = socket;
