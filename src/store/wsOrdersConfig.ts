import { SocketConfig } from './socketMiddleware';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './wsOrdersSlice';

export const WS_ORDERS_CONNECT = 'WS_ORDERS_CONNECT';
export const WS_ORDERS_DISCONNECT = 'WS_ORDERS_DISCONNECT';

export const wsOrdersConfig: SocketConfig = {
  connectActionType: WS_ORDERS_CONNECT,
  disconnectActionType: WS_ORDERS_DISCONNECT,
  connectingAction: wsConnecting,
  openAction: wsOpen,
  closeAction: wsClose,
  errorAction: wsError,
  messageAction: (data) => {
    if (data.success) {
      return wsMessage({
        orders: data.orders,
        total: data.total,
        totalToday: data.totalToday,
      });
    }
    return wsError('Неверный формат данных');
  }
}; 