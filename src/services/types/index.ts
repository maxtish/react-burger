import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ActionCreator } from 'redux';
import store from '../store/store';
import { TWsActions } from './ws';
import { TConstructorActions } from './constructor';
import { TIngredientsActions } from './ingredients';
import { TOrderActions } from './order';
import { TPasswordActions } from './password';
import { TUserActions } from './user';
import { TIngredientDetailModal } from './ingredient-detail-modal';

type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TPasswordActions
  | TUserActions
  | TIngredientDetailModal
  | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, RootState, unknown, TApplicationActions>
>;
