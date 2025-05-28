import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import burgerConstructorReducer from '../services/reducers/constructor';
import ingredientDetailsReducer from '../services/reducers/ingredientDetails';
import ingredientsReducer from '../services/reducers/ingredients';
import orderReducer from '../services/reducers/order';

const store = configureStore({
  reducer: {
    auth: authReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
  },
});

export default store; 