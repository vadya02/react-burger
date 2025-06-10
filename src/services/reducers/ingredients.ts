import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { apiRequest } from '../../utils/apiUtils';
import { NORMA_API } from '../../utils/constants';
import { Ingredient } from '../../utils/types';

interface IngredientsState {
  items: Ingredient[];
  isLoading: boolean;
  hasError: boolean;
}

interface ApiResponse {
  data: Ingredient[];
  success: boolean;
}

const initialState: IngredientsState = {
  items: [],
  isLoading: false,
  hasError: false,
};

export const fetchIngredients = createAsyncThunk<Ingredient[], void, { rejectValue: string }>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const res = await apiRequest<ApiResponse>(`${NORMA_API}/ingredients`, { method: 'GET' });
      return res.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch ingredients');
    }
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<Ingredient[]>) => {
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