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

interface WsOrdersState {
  orders: Order[];
  total: number;
  totalToday: number;
  status: 'idle' | 'connecting' | 'online' | 'offline' | 'error';
  error: string | null;
}

const initialState: WsOrdersState = {
  orders: [],
  total: 0,
  totalToday: 0,
  status: 'idle',
  error: null,
};

const wsOrdersSlice = createSlice({
  name: 'wsOrders',
  initialState,
  reducers: {
    wsConnecting(state) {
      state.status = 'connecting';
      state.error = null;
    },
    wsOpen(state) {
      state.status = 'online';
      state.error = null;
    },
    wsClose(state) {
      state.status = 'offline';
    },
    wsError(state, action: PayloadAction<string>) {
      state.status = 'error';
      state.error = action.payload;
    },
    wsMessage(state, action: PayloadAction<{ orders: Order[]; total: number; totalToday: number }>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
  },
});

export const { wsConnecting, wsOpen, wsClose, wsError, wsMessage } = wsOrdersSlice.actions;
export default wsOrdersSlice.reducer; 