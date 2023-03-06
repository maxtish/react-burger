import { v4 as uuidv4 } from 'uuid';
import { IIngredient } from '../types/data';
import { TConstructorActions } from '../types/constructor';

export const CONSTRUCTOR_ADD: 'CONSTRUCTOR_ADD' = 'CONSTRUCTOR_ADD'; // Добавить ингридиент в конструктор
export const DELETE_ING: 'DELETE_ING' = 'DELETE_ING'; // Удалить TOGGLE_LIST
export const TOGGLE_ING: 'TOGGLE_LIST' = 'TOGGLE_LIST'; // Менять
export const CLEAR_ING: 'CLEAR_ING' = 'CLEAR_ING'; // Очистить всё

export const addToConstructor = (ingredient: IIngredient): TConstructorActions => {
  return {
    type: CONSTRUCTOR_ADD,
    payload: { ...ingredient, id: uuidv4() },
  };
};
