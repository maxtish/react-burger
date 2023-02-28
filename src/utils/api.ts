import {
  ICreateUser,
  IGetData,
  IGetUserData,
  ILoginData,
  ILogoutRequest,
  IPostForgotPassword,
  IPostOrder,
  IPostResetPassword,
  IRefreshTokenRequest,
  IRegisterData,
  IResetPassword,
  IUpdateUserData,
} from '../services/types/data';
import { getCookie } from './utils';

const API_URL = 'https://norma.nomoreparties.space/api/';

async function request<T>(API_URL: string, options?: RequestInit) {
  // принимает два аргумента: урл и объект опций
  const res = await fetch(API_URL, options);
  return getResponse<T>(res);
}
function getResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

//Получить ингридиенты
export function getIngredients() {
  return request<IGetData>(`${API_URL}ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

//Отправить заказ
export function getOrderDetails(idArrSelected: Array<string>) {
  return request<IPostOrder>(`${API_URL}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    body: JSON.stringify({ ingredients: idArrSelected }),
  });
}

//Проверка для Восстановить пароль
export function getForgotPassword(data: { email: string }) {
  return request<IPostForgotPassword>(`${API_URL}password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

//Восстановить пароль
export function getResetPassword(data: IResetPassword) {
  return request<IPostResetPassword>(`${API_URL}password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

//Создать пользователя
export function createUser(data: IRegisterData) {
  return request<ICreateUser>(`${API_URL}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

//Для авторизации пользователя вход
export function loginRequest(data: ILoginData) {
  return request<ICreateUser>(`${API_URL}auth/login`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
}

//Для выхода пользователя
export function logoutRequest(refreshToken: string) {
  return request<ILogoutRequest>(`${API_URL}auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
}

//Для обновления токена пользователя
export function refreshTokenRequest() {
  const refreshToken = getCookie('refreshToken');
  return request<IRefreshTokenRequest>(`${API_URL}auth/token`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  });
}

//Для получения данных пользователя
export function getUserData() {
  return request<IGetUserData>(`${API_URL}auth/user`, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
}

//Для обновления данных пользователя
export function updateUserData(data: IUpdateUserData) {
  return request<IGetUserData>(`${API_URL}auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  });
}
