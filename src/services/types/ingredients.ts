import { IIngredient } from './data';
import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, POSITION_SCROLL } from '../actions/ingredients';

type TGetItemsRequestAction = {
  readonly type: typeof GET_ITEMS_REQUEST;
};
type TGetItemsSuccessAction = {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: Array<IIngredient>;
};
type TGetItemsErrorAction = {
  readonly type: typeof GET_ITEMS_FAILED;
};
type TTabPositionScroll = {
  readonly type: typeof POSITION_SCROLL;
  readonly positionScroll: string;
};
export type TIngredientsActions = TGetItemsRequestAction | TGetItemsSuccessAction | TGetItemsErrorAction | TTabPositionScroll;
