import { getOrderDetails } from '../../utils/api';
import { AppDispatch } from '../types';
import { CLEAR_ING } from './constructor';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST'; // запрос
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS'; // успех
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED'; // нет успеха
export const VIEWING_ORDER_ENABLED: 'VIEWING_ORDER_ENABLED' = 'VIEWING_ORDER_ENABLED'; // Просмотр заказа открыть
export const VIEWING_ORDER_DISABLED: 'VIEWING_ORDER_DISABLED' = 'VIEWING_ORDER_DISABLED'; // Просмотр заказа закрыть

export function getOrder(idArrSelected: Array<string>) {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderDetails(idArrSelected)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          number: res.order.number,
        });
      })
      .then(() => {
        dispatch({
          type: CLEAR_ING,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
