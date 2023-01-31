import {
  GET_NEW_USER_REQUEST,
  GET_NEW_USER_SUCCESS,
  GET_NEW_USER_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_ERROR,
} from '../actions/user';

//
const initialUserState = {
  isAuth: false,
  userData: {
    name: '',
    email: '',
  },
  userNewDataRequest: false,
  userNewDataFailed: false,
  userDataFailed: false,
  userDataRequest: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  updateRequest: false,
  updateFailed: false,
};

export const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case GET_NEW_USER_REQUEST: {
      return { ...state, userNewDataRequest: true };
    }

    case GET_NEW_USER_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        userData: action.data,
        userNewDataFailed: false,
        userNewDataRequest: false,
      };
    }

    case GET_NEW_USER_ERROR: {
      return { ...state, userNewDataFailed: true, userNewDataRequest: false };
    }

    case USER_LOGIN_REQUEST: {
      return { ...state, userDataRequest: true };
    }

    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        isAuth: true,
        userData: action.data,
        userDataFailed: false,
        userDataRequest: false,
      };
    }

    case USER_LOGIN_ERROR: {
      return { ...state, userDataFailed: true, userDataRequest: false };
    }

    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false,
      };
    }

    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuth: false,
        userData: {
          name: '',
          email: '',
        },
        logoutRequest: false,
      };
    }

    case USER_LOGOUT_ERROR: {
      return {
        ...state,
        logoutFailed: true,
        logoutRequest: false,
        isAuth: true,
      };
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserRequest: true,
        getUserFailed: false,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        getUserRequest: false,
        isAuth: true,
      };
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        getUserFailed: true,
        getUserRequest: false,
      };
    }

    case USER_UPDATE_REQUEST: {
      return {
        ...state,
        updateRequest: true,
        updateFailed: false,
      };
    }
    case USER_UPDATE_SUCCESS: {
      return {
        ...state,
        userData: action.data,
        updateRequest: false,
      };
    }
    case USER_UPDATE_ERROR: {
      return {
        ...state,
        updateFailed: true,
        updateRequest: false,
      };
    }

    default: {
      return state;
    }
  }
};
