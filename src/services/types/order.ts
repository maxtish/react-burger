import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  VIEWING_ORDER_ENABLED,
  VIEWING_ORDER_DISABLED,
} from '../actions/order';

type TSubmitOrderRequestAction = {
  readonly type: typeof GET_ORDER_REQUEST;
};
type TSubmitOrderSuccessAction = {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly number: number;
};
type TSubmitOrderErrorAction = {
  readonly type: typeof GET_ORDER_FAILED;
};
type TOpenModalOrderAction = {
  readonly type: typeof VIEWING_ORDER_ENABLED;
};
type TCloseModalOrderAction = {
  readonly type: typeof VIEWING_ORDER_DISABLED;
};

export type TOrderActions =
  | TSubmitOrderRequestAction
  | TSubmitOrderSuccessAction
  | TSubmitOrderErrorAction
  | TOpenModalOrderAction
  | TCloseModalOrderAction;
