import { combineReducers } from 'redux';
import { constructorReducer } from './constructor';
import { ingredientsReducer } from './ingredients';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructors: constructorReducer,
});
