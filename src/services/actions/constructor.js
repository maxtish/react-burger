import { v4 as uuidv4 } from 'uuid';
export const CONSTRUCTOR_ADD = 'CONSTRUCTOR_ADD'; // Добавить ингридиент в конструктор
export const DELETE_ING = 'DELETE_ING'; // Удалить TOGGLE_LIST
export const TOGGLE_ING = 'TOGGLE_LIST'; // Менять

export const addToConstructor = (ingredients) => {
  return {
    type: CONSTRUCTOR_ADD,
    payload: { ...ingredients, id: uuidv4() },
  };
};
