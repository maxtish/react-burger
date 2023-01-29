const url = 'https://norma.nomoreparties.space/api/';

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
  console.log('Тело запроса:', data);
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
  console.log('Тело запроса:', data);
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
  console.log('Тело запроса:', data);
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
