import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App.js';
import retrieveNumbers from './reducers/retrieveNumbers'

import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  retrieveNumbers,
  form: formReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
