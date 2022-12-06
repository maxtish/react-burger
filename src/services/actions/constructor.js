import { getOrderDetails } from '../../utils/api';

export const GET_INGREDIENTS = 'ADD_INGREDIENTS'; // Получение списка ингредиентов для конструктора бургера
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'; // запрос
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'; // успех
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'; // нет успеха
export const VIEWING_ORDER_ENABLED = 'VIEWING_ORDER_ENABLED'; // Просмотр заказа открыть
export const VIEWING_ORDER_DISABLED = 'VIEWING_ORDER_DISABLED'; // Просмотр заказа закрыть
export const ADD_SELECTED_ING = 'ADD_SELECTED_ING'; // Добавить
export const DELETE_ING = 'DELETE_ING'; // Удалить

export function getOrder(idArrSelected) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderDetails(idArrSelected)
      .then((res) => {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order,
        });
      })

      .catch((error) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
}
