import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers/index';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../middleware/socketMiddleware';

import { ACTIONS } from '../actions/wsActionTypes';
const wsUrl = 'wss://norma.nomoreparties.space/orders';
const wsActions = {
  wsInit: ACTIONS.WS_CONNECTION_START,
  wsSendMessage: ACTIONS.WS_SEND_MESSAGE,
  onOpen: ACTIONS.WS_CONNECTION_SUCCESS,
  onClose: ACTIONS.WS_CONNECTION_CLOSED,
  close: ACTIONS.WS_CONNECTION_CLOSE,
  onError: ACTIONS.WS_CONNECTION_ERROR,
  onMessage: ACTIONS.WS_GET_MESSAGE,
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

const store = createStore(rootReducer, enhancer);
export default store;
