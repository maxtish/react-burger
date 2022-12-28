import { getIngredients } from '../../utils/api';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST'; // запрос для получение списка ингредиентов от API
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS'; // успех получение списка ингредиентов от API
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED'; // нет успеха получение списка ингредиентов от API
export const VIEWING_INGREDIENT_ENABLED = 'VIEWING_INGREDIENT_ENABLED'; //просмотр ингредиента,
export const VIEWING_INGREDIENT_DISABLED = 'VIEWING_INGREDIENT_DISABLED'; //закрыть просмотр ингредиента,
export const POSITION_SCROLL = 'POSITION_SCROLL'; //позиция скролла,
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
