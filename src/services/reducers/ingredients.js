//
import {
  GET_ING,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  VIEWING_INGREDIENT_ENABLED,
  VIEWING_INGREDIENT_DISABLED,
} from '../actions/ingredients';

let initialState = {
  ing: 9,
  data: [],
  selectedIngredient: {},
  visibleModal: false,
  hasError: false,
  isLoading: false,
};

// Редьюсер

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Добавить ингридиент
    case GET_ING: {
      return {
        ...state,
        ing: state.ing + 1,
      };
    }

    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.items,
      };
    }

    case GET_ITEMS_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }

    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    }
    case VIEWING_INGREDIENT_ENABLED: {
      return {
        ...state,
        selectedIngredient: action.ing,
        visibleModal: true,
      };
    }

    case VIEWING_INGREDIENT_DISABLED: {
      return {
        ...state,
        selectedIngredient: {},
        visibleModal: false,
      };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
