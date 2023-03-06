import {
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED,
  SAVE_PASSWORD,
} from '../actions/password';

type TGetForgotPasswordRequestAction = {
  readonly type: typeof GET_FORGOT_PASSWORD_REQUEST;
};
type TGetForgotPasswordSuccessAction = {
  readonly type: typeof GET_FORGOT_PASSWORD_SUCCESS;
  readonly data: boolean;
};
type TGetForgotPasswordErrorAction = {
  readonly type: typeof GET_FORGOT_PASSWORD_FAILED;
  readonly data: boolean;
};
type TGetResetPasswordRequestAction = {
  readonly type: typeof GET_RESET_PASSWORD_REQUEST;
};
type TGetResetPasswordSuccessAction = {
  readonly type: typeof GET_RESET_PASSWORD_SUCCESS;
  readonly data: boolean;
};
type TGetResetPasswordErrorAction = {
  readonly type: typeof GET_RESET_PASSWORD_FAILED;
  readonly data: boolean;
};
type TSavePasswordAction = {
  readonly type: typeof SAVE_PASSWORD;
  readonly password: string;
};

export type TPasswordActions =
  | TSavePasswordAction
  | TGetForgotPasswordRequestAction
  | TGetForgotPasswordSuccessAction
  | TGetForgotPasswordErrorAction
  | TGetResetPasswordRequestAction
  | TGetResetPasswordSuccessAction
  | TGetResetPasswordErrorAction;
