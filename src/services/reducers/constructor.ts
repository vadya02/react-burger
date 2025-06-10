import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../utils/types';

export interface ConstructorIngredient extends Ingredient {
  uuid: string;
}

export interface ConstructorState {
  bun: Ingredient | null;
  ingredients: ConstructorIngredient[];
}

export interface MoveIngredientPayload {
  dragIndex: number;
  hoverIndex: number;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: [],
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer(state, action: PayloadAction<Ingredient & { id: string }>) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push({ ...action.payload, uuid: action.payload.id });
        }
      },
      prepare(ingredient: Ingredient) {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      },
    },
    removeIngredient(state, action: PayloadAction<string>) {
      state.ingredients = state.ingredients.filter(item => item.uuid !== action.payload);
    },
    moveIngredient(state, action: PayloadAction<MoveIngredientPayload>) {
      const { dragIndex, hoverIndex } = action.payload;
      const items = [...state.ingredients];
      const [removed] = items.splice(dragIndex, 1);
      items.splice(hoverIndex, 0, removed);
      state.ingredients = items;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } = constructorSlice.actions;
export default constructorSlice.reducer; 