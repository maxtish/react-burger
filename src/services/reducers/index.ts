import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { ingredientDetailModal } from './ingredient-detail-modal';
import { forgotPassword } from './password';
import { userReducer } from './user';
import { wsReducer } from './ws';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
  order: orderReducer,
  ingredientDetailModal: ingredientDetailModal,
  forgotPassword: forgotPassword,
  user: userReducer,
  ws: wsReducer,
});
