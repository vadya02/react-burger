import { Ingredient } from '../../types/ingredient';

export interface User {
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: User;
  message?: string;
}

export interface IngredientsState {
  items: Ingredient[];
  loading: boolean;
  error: string | null;
}

export interface BurgerConstructorState {
  bun: Ingredient | null;
  ingredients: Ingredient[];
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  user: User | null;
} 