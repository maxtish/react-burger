import { ACTIONS } from './wsActionTypes';

export const wsConnectionOpen = (data) => ({ type: ACTIONS.WS_CONNECTION_START, payload: data });

export const wsConnectionSuccess = () => ({
  type: ACTIONS.WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = () => ({ type: ACTIONS.WS_CONNECTION_ERROR });

export const wsConnectionClose = () => ({ type: ACTIONS.WS_CONNECTION_CLOSE });

export const wsGetMessage = (data) => ({
  type: ACTIONS.WS_GET_MESSAGE,
  payload: data,
});

export const wsSendMessage = (data) => ({
  type: ACTIONS.WS_SEND_MESSAGE,
  payload: data,
});
