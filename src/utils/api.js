const url = 'https://norma.nomoreparties.space/api/ingredients';

export default function getIngredients() {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Conternt-Type': 'application/json',
    },
  }).then(getResponse);
}

function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}
