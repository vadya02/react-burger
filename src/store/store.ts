import { configureStore } from '@reduxjs/toolkit';
import burgerConstructorReducer from '../services/reducers/constructor';
import ingredientDetailsReducer from '../services/reducers/ingredientDetails';
import ingredientsReducer from '../services/reducers/ingredients';
import orderReducer from '../services/reducers/order';
import authReducer from './slices/authSlice';
import { socketMiddleware } from './socketMiddleware';
import userOrdersReducer from './userOrdersSlice';
import wsOrdersReducer from './wsOrdersSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    burgerConstructor: burgerConstructorReducer,
    ingredientDetails: ingredientDetailsReducer,
    ingredients: ingredientsReducer,
    order: orderReducer,
    wsOrders: wsOrdersReducer,
    userOrders: userOrdersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 