import { setCookie, getCookie, deleteCookie } from '../../utils/utils';
import {
  createUser,
  loginRequest,
  getUserData,
  updateUserData,
  refreshTokenRequest,
  logoutRequest,
} from '../../utils/api';
import { AppDispatch } from '../types/index';
import { IRegisterData, ILoginData, IUpdateUserData } from '../types/data';

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

// Создание нового пользователя
export const getNewUser = (data: IRegisterData) => (dispatch: AppDispatch) => {
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
export const signIn = (data: ILoginData) => (dispatch: AppDispatch) => {
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
      console.log(res);
    });
};

//Выход пользователя из системы
export const signOut = () => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_LOGOUT_REQUEST,
  });
  const refreshToken = getCookie('refreshToken');
  if (refreshToken !== undefined) {
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
  }
};

//Для получения данных и обновления токена пользователя
export const getUser = () => (dispatch: AppDispatch) => {
  dispatch({
    type: GET_USER_REQUEST,
  });

  if (getCookie('accessToken') === undefined && getCookie('refreshToken') === undefined) {
    return null;
  }
  if (getCookie('accessToken') !== undefined) {
    getUserData()
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
  } else {
    refreshTokenRequest().then((res) => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      const refreshToken = res.refreshToken;
      if (accessToken) {
        setCookie('accessToken', accessToken, { 'max-age': 1200 });
        setCookie('refreshToken', refreshToken);
      }
      getUserData()
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
    });
  }
};

//Для обновления данных пользователя
export const updateUser = (data: IUpdateUserData) => (dispatch: AppDispatch) => {
  dispatch({
    type: USER_UPDATE_REQUEST,
  });
  if (getCookie('accessToken') !== undefined) {
    updateUserData(data)
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
  } else {
    refreshTokenRequest().then((res) => {
      const accessToken = res.accessToken.split('Bearer ')[1];
      const refreshToken = res.refreshToken;
      if (accessToken) {
        setCookie('accessToken', accessToken, { 'max-age': 1200 });
        setCookie('refreshToken', refreshToken);
      }
      updateUserData(data)
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
    });
  }
};
