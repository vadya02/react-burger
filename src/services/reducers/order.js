import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { NORMA_API } from '../../utils/constants';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const res = await fetch(`${NORMA_API}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredientIds }),
      });
      if (!res.ok) throw new Error('Ошибка создания заказа');
      const data = await res.json();
      return data.order.number;
    } catch (err) {
      return rejectWithValue(err.message);
    }
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