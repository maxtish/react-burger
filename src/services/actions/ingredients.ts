import { getIngredients } from '../../utils/api';
import { AppDispatch } from '../types/index';


export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'; // запрос для получение списка ингредиентов от API
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'; // успех получение списка ингредиентов от API
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'; // нет успеха получение списка ингредиентов от API
export const POSITION_SCROLL = 'POSITION_SCROLL'; //позиция скролла,



export function getItemsIng() {
  return function (dispatch: AppDispatch) {
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
