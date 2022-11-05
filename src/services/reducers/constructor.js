import { ADD_ING } from '../actions/constructor';

let initialState = {
  numb: 1,
};

// Редьюсер

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    // Добавить ингридиент
    case ADD_ING: {
      return state.numb + 1;
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
