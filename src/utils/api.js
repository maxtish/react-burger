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

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
