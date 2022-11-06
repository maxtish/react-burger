//
import { GET_ING } from '../actions/constructor';

let initialState = {
  ing: 9,
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

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
