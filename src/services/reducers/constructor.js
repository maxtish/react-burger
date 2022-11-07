//
import { ADD_ING, ADD_INGREDIENTS } from '../actions/constructor';

let initialState = {
  number: 0,
  selectedIngredients: [],
};

// Редьюсер

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    // Добавить ингридиент
    case ADD_ING: {
      return {
        ...state,
        number: state.number + 1,
      };
    }
    case ADD_INGREDIENTS: {
      return {
        ...state,
        selectedIngredients: action.ing,
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
