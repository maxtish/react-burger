import { getIngredients } from '../../utils/api';
export const GET_ING = 'GET_ING'; // добавление ингридиентов API
//export const GET_ING_DATA = 'GET_ING_DATA'; // добавление ингридиентов API
export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'; // запрос
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'; // успех
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'; // нет успеха

export function getItemsIng() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getIngredients()
      .then((res) => {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.data,
        });
      })

      .catch((error) => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}
