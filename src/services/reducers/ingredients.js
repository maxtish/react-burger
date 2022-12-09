//
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  VIEWING_INGREDIENT_ENABLED,
  VIEWING_INGREDIENT_DISABLED,
  POSITION_SCROLL,
} from '../actions/ingredients';

let initialState = {
  ing: 9,
  data: [],
  viewingIngredient: {},
  visibleModal: false,
  hasError: false,
  isLoading: false,
  positionScroll: 'one',
};

// Редьюсер

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Добавить ингридиент

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
        data: [],
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
        viewingIngredient: action.ing,
        visibleModal: true,
      };
    }

    case VIEWING_INGREDIENT_DISABLED: {
      return {
        ...state,
        viewingIngredient: {},
        visibleModal: false,
      };
    }
    case POSITION_SCROLL: {
      return {
        ...state,
        positionScroll: action.positionScroll,
      };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
