import { createUser } from '../../utils/api';

export const GET_NEW_USER_REQUEST = 'GET_NEW_USER_REQUEST';
export const GET_NEW_USER_SUCCESS = 'GET_NEW_USER_SUCCESS';
export const GET_NEW_USER_ERROR = 'GET_NEW_USER_ERROR';

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
      console.log('createUser' + res.message);
    });
};
