import { ADD_ING } from '../actions/constructor';

const initialState = {
  itemsAllIng: [], // список всех полученных ингредиентов
  itemsAllActiveIng: [], // список всех ингредиентов в текущем конструкторе бургера
  objIng: {}, //объект текущего просматриваемого ингредиента
  objOrder: {}, //объект созданного заказа
};

// Редьюсер

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    // Добавить ингридиент
    case ADD_ING: {
      return { ...state };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
