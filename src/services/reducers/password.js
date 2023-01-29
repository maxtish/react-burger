import {
  GET_FORGOT_PASSWORD_REQUEST,
  GET_FORGOT_PASSWORD_SUCCESS,
  GET_FORGOT_PASSWORD_FAILED,
  GET_RESET_PASSWORD_REQUEST,
  GET_RESET_PASSWORD_SUCCESS,
  GET_RESET_PASSWORD_FAILED,
  SAVE_PASSWORD,
} from '../actions/password';

let initialState = {
  forgotPasswordRequest: false,
  forgotPasswordStatus: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordStatus: false,
  password: '',
};

// Редьюсер

export const forgotPassword = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }

    case GET_FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordStatus: action.data,
      };
    }

    case GET_FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
        forgotPasswordStatus: action.data,
      };
    }
    case GET_RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }

    case GET_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordStatus: action.data,
        resetPasswordRequest: false,
        forgotPasswordStatus: false,
      };
    }

    case GET_RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
        resetPasswordStatus: action.data,
        forgotPasswordStatus: false,
      };
    }

    case SAVE_PASSWORD: {
      return {
        ...state,
        password: action.password,
      };
    }

    default: {
      return state;
    }
  }
};
