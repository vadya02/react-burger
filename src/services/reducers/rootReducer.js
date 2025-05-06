import { combineReducers } from 'redux';
import ingredientsReducer from './ingredients';
import constructorReducer from './constructor';
import ingredientDetailsReducer from './ingredientDetails';
import orderReducer from './order';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  ingredientDetails: ingredientDetailsReducer,
  order: orderReducer,
});

export default rootReducer; 