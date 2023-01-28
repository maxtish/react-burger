import { VIEWING_INGREDIENT_ENABLED, VIEWING_INGREDIENT_DISABLED } from '../actions/ingredient-detail-modal';
let initialState = {
  viewingIngredient: {},
  visibleModal: false,
};

// Редьюсер

export const ingredientDetailModal = (state = initialState, action) => {
  switch (action.type) {
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

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
