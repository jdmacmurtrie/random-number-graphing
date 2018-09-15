import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App.js';
import submitNumber from './reducers/submitNumber'

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  submitNumber,
  form: formReducer
})

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);registerServiceWorker();
