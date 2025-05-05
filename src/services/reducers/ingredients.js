import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NORMA_API } from '../../utils/constants';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${NORMA_API}/ingredients`);
      if (!res.ok) throw new Error('Ошибка загрузки ингредиентов');
      const data = await res.json();
      return data.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export default ingredientsSlice.reducer; 