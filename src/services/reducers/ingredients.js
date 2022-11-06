//
import { GET_ING, GET_ING_DATA } from '../actions/ingredients';

let initialState = {
  ing: 9,
  connect: false,
  data: [],
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

    case GET_ING_DATA: {
      return {
        ...state,
        connect: true,
        data: action.data,
      };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
