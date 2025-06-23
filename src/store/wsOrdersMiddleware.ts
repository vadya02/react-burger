import { Middleware } from 'redux';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './wsOrdersSlice';

const WS_URL = 'wss://norma.nomoreparties.space/orders/all';

export const wsOrdersConnect = () => ({ type: 'WS_ORDERS_CONNECT' as const });
export const wsOrdersDisconnect = () => ({ type: 'WS_ORDERS_DISCONNECT' as const });

type WsOrdersActions = 
  | ReturnType<typeof wsOrdersConnect>
  | ReturnType<typeof wsOrdersDisconnect>;

export const wsOrdersMiddleware: Middleware = store => next => action => {
  let socket: WebSocket | null = null;

  if ((action as { type: string }).type === 'WS_ORDERS_CONNECT') {
    socket = new WebSocket(WS_URL);
    store.dispatch(wsConnecting());

    socket.onopen = () => {
      store.dispatch(wsOpen());
    };

    socket.onclose = () => {
      store.dispatch(wsClose());
    };

    socket.onerror = () => {
      store.dispatch(wsError('WebSocket error'));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.success) {
        store.dispatch(wsMessage({
          orders: data.orders,
          total: data.total,
          totalToday: data.totalToday,
        }));
      }
    };
  }

  if ((action as { type: string }).type === 'WS_ORDERS_DISCONNECT') {
    socket?.close();
    socket = null;
  }

  return next(action);
}; 