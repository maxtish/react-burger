import { IWsMessage } from '../types/data';

import {
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
} from './wsActionTypes';

export const wsConnectionOpen = (data: string) => ({ type: WS_CONNECTION_START, payload: data });

export const wsConnectionSuccess = () => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = () => ({ type: WS_CONNECTION_ERROR });

export const wsConnectionClose = () => ({ type: WS_CONNECTION_CLOSED });

export const wsGetMessage = (message: IWsMessage) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

/*export const wsSendMessage = (data: IWsMessage) => ({
  type: ACTIONS.WS_SEND_MESSAGE,
  payload: data,
}); */
