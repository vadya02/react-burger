import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from '../services/reducers/constructor';
import ingredientDetailsReducer from '../services/reducers/ingredientDetails';
import ingredientsReducer from '../services/reducers/ingredients';
import orderReducer from '../services/reducers/order';
import authReducer from './slices/authSlice';
import type { AppDispatch, RootState } from './types';
import wsOrdersReducer from './wsOrdersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    wsOrders: wsOrdersReducer,
  },
});

export type { AppDispatch, RootState };
export default store; 