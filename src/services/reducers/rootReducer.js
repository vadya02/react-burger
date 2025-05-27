import { combineReducers } from 'redux';
import auth from './auth';
import constructorReducer from './constructor';
import ingredientDetailsReducer from './ingredientDetails';
import ingredientsReducer from './ingredients';
import orderReducer from './order';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
  auth,
});

export default rootReducer; 