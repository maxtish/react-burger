import { VIEWING_INGREDIENT_ENABLED, VIEWING_INGREDIENT_DISABLED } from '../actions/ingredient-detail-modal';
import { IIngredient } from '../types/data';
import { TIngredientDetailModal } from '../types/ingredient-detail-modal';

const initialState: { viewingIngredient: IIngredient | null; visibleModal: boolean } = {
  viewingIngredient: null,
  visibleModal: false,
};

// Редьюсер

export const ingredientDetailModal = (state = initialState, action: TIngredientDetailModal) => {
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
        viewingIngredient: null,
        visibleModal: false,
      };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
