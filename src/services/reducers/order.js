import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../../utils/apiUtils';
import { NORMA_API } from '../../utils/constants';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds, { rejectWithValue }) => {
    const res = await apiRequest(`${NORMA_API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientIds }),
    });
    const data = await res;
    return data.order.number;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: { number: null, isLoading: false, hasError: false },
  reducers: {
    clearOrder(state) {
      state.number = null;
      state.isLoading = false;
      state.hasError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.number = action.payload;
        state.isLoading = false;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer; 