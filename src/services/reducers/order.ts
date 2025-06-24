import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderRequest, OrderResponse } from '../../types/order';
import { createOrder as createOrderApi } from '../api';
import { AppDispatch } from '../../store/types';
import { refreshUserToken } from '../../store/slices/authSlice';

interface OrderState {
  number: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  number: null,
  loading: false,
  error: null
};

export const createOrder = createAsyncThunk<OrderResponse, OrderRequest, { dispatch: AppDispatch }>(
  'order/create',
  async (orderData, { dispatch }) => {
    try {
      const response = await createOrderApi(orderData);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error && error.message === 'TOKEN_EXPIRED') {
        await dispatch(refreshUserToken()).unwrap();
        const retryResponse = await createOrderApi(orderData);
        return retryResponse;
      }
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.number = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<OrderResponse>) => {
        state.loading = false;
        state.number = action.payload.order.number;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при создании заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer; 