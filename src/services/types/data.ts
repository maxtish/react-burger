export type TInput = {
  value: string;
  isChange: boolean;
};

export type TIngredientGroup = 'bun' | 'sauce' | 'main';

export interface IIngredient {
  readonly _id: string;
  readonly name: string;
  readonly type?: TIngredientGroup;
  readonly proteins?: number;
  readonly fat?: number;
  readonly carbohydrates?: number;
  readonly calories?: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile?: string;
  readonly image_large?: string;
  readonly __v?: number;
  //sysid?: string;
  id?: string;
}

export interface IOrder {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}

export interface IItemConstructorProps {
  ingrdient: IIngredient;
  isLocked?: boolean;
}

export interface IBunsConstructorProps {
  bunsActiv: IIngredient;
  position: 'top' | 'bottom';
}

export interface IIngredientsGroupProps {
  arr: Array<IIngredient>;
  counters: { [key: string]: number | undefined };
}

export interface IIngredientProps {
  item: IIngredient;
  counters: { [key: string]: number | undefined };
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IUpdateUserData {
  name?: string;
  email?: string;
  password?: string;
}

export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export type TUserData = Omit<IRegisterData, 'password'>;

export interface IOrder {
  readonly createdAt: string;
  readonly ingredients: ReadonlyArray<string>;
  readonly name: string;
  readonly number: number;
  readonly status: string;
  readonly updatedAt: string;
  readonly _id: string;
}

export interface IWsMessage {
  success?: boolean;
  orders: Array<IOrder>;
  total: number;
  totalToday: number;
}

export interface IResetPassword {
  password: string;
  token: string;
}

//

export interface IGetData {
  data: Array<IIngredient>;
  success: boolean;
}

export interface IPostOrder {
  order: IOrder;
  success: boolean;
}

export interface IPostForgotPassword {
  success: boolean;
  message: string;
}

export interface IPostResetPassword {
  success: boolean;
  message: string;
}

export interface ICreateUser {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: TUserData;
}

export interface ILogoutRequest {
  success: boolean;
  message: string;
}

export interface IRefreshTokenRequest {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

export interface IGetUserData {
  success: boolean;
  user: TUserData;
}
