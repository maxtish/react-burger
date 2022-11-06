import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './components/app/app.jsx';

import { rootReducer } from './services/reducers/index';
import { Provider, useDispatch } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import { constructorReducer } from './services/reducers/constructor';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById('root'));
store.subscribe(() => {
  console.log(store.getState());
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
