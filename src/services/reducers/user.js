import { GET_NEW_USER_REQUEST, GET_NEW_USER_SUCCESS, GET_NEW_USER_ERROR } from '../actions/user';

const initialUserState = {
  isAuth: false,
  userData: {
    name: '',
    email: '',
  },
  userNewDataRequest: false,
  userNewDataFailed: false,
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
    default: {
      return state;
    }
  }
};
