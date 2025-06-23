import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  _id: string;
  number: number;
  name: string;
  status: string;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}

interface UserOrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  status: 'idle' | 'connecting' | 'online' | 'offline' | 'error';
  error: string | null;
}

const initialState: UserOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle',
  error: null,
};

const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {
    userWsConnecting(state) {
      state.status = 'connecting';
      state.error = null;
    },
    userWsOpen(state) {
      state.status = 'online';
      state.error = null;
    },
    userWsClose(state) {
      state.status = 'offline';
    },
    userWsError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    userWsMessage(state, action: PayloadAction<{ orders: Order[]; total: number; totalToday: number }>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const { userWsConnecting, userWsOpen, userWsClose, userWsError, userWsMessage } = userOrdersSlice.actions;
export default userOrdersSlice.reducer; 