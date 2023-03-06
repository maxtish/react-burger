import { IIngredient } from './data';
import { CONSTRUCTOR_ADD, DELETE_ING, TOGGLE_ING, CLEAR_ING } from '../actions/constructor';

type TAddSelectedItemAction = {
  readonly type: typeof CONSTRUCTOR_ADD;
  readonly payload: IIngredient;
};
type TDeleteItemAction = {
  readonly type: typeof DELETE_ING;
  readonly indexN: number;
};

type TToggleListAction = {
  readonly type: typeof TOGGLE_ING;
  readonly payload: {
    from: number;
    to: number;
  };
};

type TClearSelectedItemAction = {
  readonly type: typeof CLEAR_ING;
};

export type TConstructorActions =
  | TAddSelectedItemAction
  | TDeleteItemAction
  | TToggleListAction
  | TClearSelectedItemAction;
