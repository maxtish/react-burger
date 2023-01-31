import { getForgotPassword, getResetPassword } from '../../utils/api';

export const GET_FORGOT_PASSWORD_REQUEST = 'GET_FORGOT_PASSWORD_REQUEST';
export const GET_FORGOT_PASSWORD_SUCCESS = 'GET_FORGOT_PASSWORD_SUCCESS';
export const GET_FORGOT_PASSWORD_FAILED = 'GET_FORGOT_PASSWORD_FAILED';

export const GET_RESET_PASSWORD_REQUEST = 'GET_RESET_PASSWORD_REQUEST';
export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS';
export const GET_RESET_PASSWORD_FAILED = 'GET_RESET_PASSWORD_FAILED';
export const SAVE_PASSWORD = 'SAVE_PASSWORD';

export const getForgotPasswordAction = (email) => (dispatch) => {
  dispatch({
    type: GET_FORGOT_PASSWORD_REQUEST,
  });
  getForgotPassword(email)
    .then((res) => {
      dispatch({
        type: GET_FORGOT_PASSWORD_SUCCESS,
        data: res.success,
      });
    })
    .catch((res) => {
      dispatch({
        type: GET_FORGOT_PASSWORD_FAILED,
        data: res.success,
      });
    });
};

export const getResetPasswordAction = (data) => (dispatch) => {
  dispatch({
    type: GET_RESET_PASSWORD_REQUEST,
  });
  getResetPassword(data)
    .then((res) => {
      dispatch({
        type: GET_RESET_PASSWORD_SUCCESS,
        data: res.success,
      });
    })
    .catch((res) => {
      dispatch({
        type: GET_RESET_PASSWORD_FAILED,
        data: res.success,
      });
    });
};
