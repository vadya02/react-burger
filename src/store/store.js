import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from '../services/reducers/constructor';
import ingredientDetailsReducer from '../services/reducers/ingredientDetails';
import ingredientsReducer from '../services/reducers/ingredients';
import orderReducer from '../services/reducers/order';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
  },
});

export default store; 