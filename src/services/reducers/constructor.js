//
import {
  GET_INGREDIENTS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  VIEWING_ORDER_ENABLED,
  VIEWING_ORDER_DISABLED,
  ADD_SELECTED_ING,
  DELETE_ING,
} from '../actions/constructor';

let initialState = {
  number: 0,
  selectedIngredients: [],
  order: {},
  orderLoading: false,
  orderError: false,
  visibleOrderModal: false,
};

// Редьюсер

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS: {
      state.selectedIngredients.unshift(action.ing);
      let bun = state.selectedIngredients.filter((item) => item.type === 'bun');
      // если клик по булке и в массиве есть уже булка
      // тогда удаляем старую булку и добавляем новую
      if ((action.ing.type === 'bun') & (bun.length > 0)) {
        bun = {};
        bun = action.ing;
        state.selectedIngredients = state.selectedIngredients.filter((item) => item.type !== 'bun');
        state.selectedIngredients.unshift(bun);
      }

      return {
        ...state,
        selectedIngredients: state.selectedIngredients,
      };
    }
    case ADD_SELECTED_ING: {
      state.selectedIngredients.unshift(action.item);
      let bun = state.selectedIngredients.filter((item) => item.type === 'bun');
      // если клик по булке и в массиве есть уже булка
      // тогда удаляем старую булку и добавляем новую
      if ((action.item.type === 'bun') & (bun.length > 0)) {
        bun = {};
        bun = action.item;
        state.selectedIngredients = state.selectedIngredients.filter((item) => item.type !== 'bun');
        state.selectedIngredients.unshift(bun);
      }
      return {
        ...state,
        selectedIngredients: state.selectedIngredients,
      };
    }

    case DELETE_ING: {
      console.log('action.indexN', action.indexN);
      let bun = state.selectedIngredients.filter((item) => item.type === 'bun');
      state.selectedIngredients = state.selectedIngredients.filter((item) => item.type !== 'bun');
      state.selectedIngredients = state.selectedIngredients.filter((item, index) => index !== action.indexN);
      state.selectedIngredients = [].concat(state.selectedIngredients, bun);
      return {
        ...state,
        selectedIngredients: state.selectedIngredients,
      };
    }

    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderLoading: true,
        orderError: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderLoading: false,
        orderError: false,
        order: action.order,
      };
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderLoading: false,
        orderError: true,
      };
    }

    case VIEWING_ORDER_ENABLED: {
      return {
        ...state,
        visibleOrderModal: true,
      };
    }
    case VIEWING_ORDER_DISABLED: {
      return {
        ...state,
        visibleOrderModal: false,
      };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};

/*

  itemsAllIng: [], // список всех полученных ингредиентов
  itemsAllSelectedIng: [], // список всех ингредиентов в текущем конструкторе бургера
  objIng: {}, //объект текущего просматриваемого ингредиента
  objOrder: {}, //объект созданного заказа

*/
