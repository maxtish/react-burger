import { getCookie } from '../../utils/utils';

export function socketMiddleware(wsUrl, wsActions, isAll) {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;

      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit && !socket) {
        const token = getCookie('accessToken');

        socket = isAll ? new WebSocket(`${wsUrl}/all`) : new WebSocket(`${wsUrl}?token=${token}`);
      }
      if (type === onClose && socket) {
        if (socket.readyState === 1) {
          socket.close();
        }
      }

      if (socket) {
        // при открытии сокета
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        // при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        // при получении события от сервера
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          dispatch({ type: onMessage, payload: parsedData });
        };

        //  при закрытии соединения
        socket.onclose = (event) => {
          socket = null;
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
}
