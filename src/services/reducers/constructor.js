import { createSlice, nanoid } from '@reduxjs/toolkit';

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    bun: null,
    ingredients: [],
  },
  reducers: {
    addIngredient: {
      reducer(state, action) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push({ ...action.payload, uuid: nanoid() });
        }
      },
      prepare(ingredient) {
        return { payload: ingredient };
      },
    },
    removeIngredient(state, action) {
      state.ingredients = state.ingredients.filter(item => item.uuid !== action.payload);
    },
    moveIngredient(state, action) {
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