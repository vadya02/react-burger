import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../utils/apiUtils';
import { NORMA_API } from '../../utils/constants';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    const res = await apiRequest(`${NORMA_API}/ingredients`);
    const data = await res;
    return data.data;
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