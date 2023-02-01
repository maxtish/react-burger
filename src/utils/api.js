import { getCookie } from './utils';

const url = 'https://norma.nomoreparties.space/api/';

async function request(url, options) {
  // принимает два аргумента: урл и объект опций
  const res = await fetch(url, options);
  return getResponse(res);
}

export function getIngredients() {
  return fetch(`${url}ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(getResponse);
}

export function getOrderDetails(idArrSelected) {
  return fetch(`${url}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: idArrSelected }),
  }).then(getResponse);
}

//Проверка для Восстановить пароль
export function getForgotPassword(data) {
  return fetch(`${url}password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(getResponse);
}

//Восстановить пароль
export function getResetPassword(data) {
  return fetch(`${url}password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(getResponse);
}

//Создать пользователя
export function createUser(data) {
  return fetch(`${url}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(getResponse);
}

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

//Для авторизации пользователя вход
export function loginRequest(data) {
  return request(`${url}auth/login`, {
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
export function logoutRequest(refreshToken) {
  return request(`${url}auth/logout`, {
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

  return request(`${url}auth/token`, {
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
  return request(`${url}auth/user`, {
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
export function updateUserData(data) {
  return request(`${url}auth/user`, {
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
