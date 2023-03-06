//
import { CONSTRUCTOR_ADD, DELETE_ING, TOGGLE_ING, CLEAR_ING } from '../actions/constructor';
import { IIngredient } from '../types/data';
import { TConstructorActions } from '../types/constructor';

let initialState: { selectedBun: IIngredient | null; selectedIngredients: Array<IIngredient> } = {
  selectedBun: null,
  selectedIngredients: [],
};

// Редьюсер

export const constructorReducer = (state = initialState, action: TConstructorActions) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD: {
      if (action.payload.type === 'bun') {
        return { ...state, selectedBun: action.payload };
      }

      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    }

    case TOGGLE_ING: {
      const ingredients = state.selectedIngredients;

      ingredients.splice(action.payload.to, 0, ingredients.splice(action.payload.from, 1)[0]);

      return {
        ...state,
        ingredients,
      };
    }

    case DELETE_ING: {
      state.selectedIngredients = state.selectedIngredients.filter((item, index) => index !== action.indexN);

      return {
        ...state,
        selectedIngredients: state.selectedIngredients,
      };
    }
    case CLEAR_ING: {
      return {
        ...state,
        selectedBun: null,
        selectedIngredients: [],
      };
    }
    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
