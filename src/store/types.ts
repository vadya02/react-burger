import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Ingredient } from '../types/ingredient';
import { OrderState } from '../types/order';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  error: string | null;
}

export interface ConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
}

export interface IngredientsState {
  items: Ingredient[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  burgerConstructor: ConstructorState;
  ingredients: IngredientsState;
  ingredientDetails: {
    item: Ingredient | null;
  };
  order: OrderState;
}

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>; 