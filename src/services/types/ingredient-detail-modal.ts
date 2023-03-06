import { VIEWING_INGREDIENT_ENABLED, VIEWING_INGREDIENT_DISABLED } from '../actions/ingredient-detail-modal';
import { IIngredient } from './data';

type TIngredientEnabledAction = {
  readonly type: typeof VIEWING_INGREDIENT_ENABLED;
  readonly ing: IIngredient;
};
type TIngredientDisabledAction = {
  readonly type: typeof VIEWING_INGREDIENT_DISABLED;
};

export type TIngredientDetailModal = TIngredientEnabledAction | TIngredientDisabledAction;
