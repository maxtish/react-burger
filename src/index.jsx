import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch, useEffect } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getItemsIng } from './services/actions/ingredients';
import { getUser } from './services/actions/user';
import './index.css';
import App from './components/app/app.jsx';

import { rootReducer } from './services/reducers/index';

import { constructorReducer } from './services/reducers/constructor';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
