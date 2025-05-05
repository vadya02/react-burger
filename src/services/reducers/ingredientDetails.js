import { createSlice } from '@reduxjs/toolkit';

const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState: { ingredient: null },
  reducers: {
    setIngredientDetails(state, action) {
      state.ingredient = action.payload;
    },
    clearIngredientDetails(state) {
      state.ingredient = null;
    },
  },
});

export const { setIngredientDetails, clearIngredientDetails } = ingredientDetailsSlice.actions;
export default ingredientDetailsSlice.reducer; 