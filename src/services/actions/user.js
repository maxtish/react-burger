import { setCookie, getCookie, deleteCookie } from '../../utils/utils';
import {
  createUser,
  loginRequest,
  getUserData,
  updateUserData,
  refreshTokenRequest,
  logoutRequest,
} from '../../utils/api';
//создание нового плльзователя
export const GET_NEW_USER_REQUEST = 'GET_NEW_USER_REQUEST';
export const GET_NEW_USER_SUCCESS = 'GET_NEW_USER_SUCCESS';
export const GET_NEW_USER_ERROR = 'GET_NEW_USER_ERROR';

//Вход нового пользователя авторизации
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

//Выход пользователя из системы
export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';

//Для обновления токена пользователя
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';

//Для обновления данных пользователя
export const USER_UPDATE_REQUEST = 'USER_UPDATE_REQUEST';
export const USER_UPDATE_SUCCESS = 'USER_UPDATE_SUCCESS';
export const USER_UPDATE_ERROR = 'USER_UPDATE_ERROR';

// для  обновления токена и куки
const refreshCookie = () => {
  refreshTokenRequest().then((res) => {
    const accessToken = res.accessToken.split('Bearer ')[1];
    if (accessToken) {
      setCookie('accessToken', accessToken, { 'max-age': 1200 });
    }
  });
};

// Создание нового пользователя
export const getNewUser = (data) => (dispatch) => {
  dispatch({
    type: GET_NEW_USER_REQUEST,
  });
  createUser(data)
    .then((res) => {
      dispatch({
        type: GET_NEW_USER_SUCCESS,
        data: res.user,
      });
    })
    .catch((res) => {
      dispatch({
        type: GET_NEW_USER_ERROR,
      });
    });
};

//Вход нового пользователя авторизации
export const signIn = (data) => (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  loginRequest(data)
    .then((res) => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      const refreshToken = res.refreshToken;

      if (accessToken && refreshToken) {
        setCookie('accessToken', accessToken, { 'max-age': 1200 });
        setCookie('refreshToken', refreshToken);
      }

      dispatch({
        type: USER_LOGIN_SUCCESS,
        data: res.user,
      });
    })
    .catch((res) => {
      dispatch({
        type: USER_LOGIN_ERROR,
      });
    });
};

//Выход пользователя из системы
export const signOut = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT_REQUEST,
  });
  const refreshToken = getCookie('refreshToken');
  logoutRequest(refreshToken)
    .then((res) => {
      dispatch({
        type: USER_LOGOUT_SUCCESS,
      });
      deleteCookie('refreshToken');
      deleteCookie('accessToken');
    })
    .catch((res) => {
      dispatch({
        type: USER_LOGOUT_ERROR,
      });
    });
};

//Для получения данных и токена пользователя
export const getUser = () => (dispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });

  getUserData()
    .then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        data: res.user,
      });
    })
    .catch((err) => {
      refreshCookie();
      dispatch({
        type: GET_USER_ERROR,
      });
    })
    .then((res) => {
      dispatch({
        type: GET_USER_SUCCESS,
        data: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_USER_ERROR,
      });
    });
};

//Для обновления данных пользователя
export const updateUser = (data) => (dispatch) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
  });

  updateUserData(data)
    .then((res) => {
      dispatch({
        type: USER_UPDATE_SUCCESS,
        data: res.user,
      });
    })
    .catch((err) => {
      refreshCookie();
      dispatch({
        type: USER_UPDATE_ERROR,
      });
    })
    .then((res) => {
      dispatch({
        type: USER_UPDATE_SUCCESS,
        data: res.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: USER_UPDATE_ERROR,
      });
    });
};
