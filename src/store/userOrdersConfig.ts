import { SocketConfig } from './socketMiddleware';
import { userWsConnecting, userWsOpen, userWsClose, userWsError, userWsMessage } from './userOrdersSlice';

export const USER_ORDERS_CONNECT = 'USER_ORDERS_CONNECT';
export const USER_ORDERS_DISCONNECT = 'USER_ORDERS_DISCONNECT';

export const userOrdersConfig: SocketConfig = {
  connectActionType: USER_ORDERS_CONNECT,
  disconnectActionType: USER_ORDERS_DISCONNECT,
  connectingAction: userWsConnecting,
  openAction: userWsOpen,
  closeAction: userWsClose,
  errorAction: userWsError,
  messageAction: (data) => {
    console.log('[userOrdersConfig] Получены данные:', data);
    if (data.success) {
      return userWsMessage({
        orders: data.orders,
        total: data.total,
        totalToday: data.totalToday,
      });
    } else if (data.message === 'Invalid or missing token') {
      console.error('[userOrdersConfig] Ошибка токена:', data.message);
      return userWsError('Токен устарел или отсутствует. Требуется повторная авторизация.');
    }
    console.error('[userOrdersConfig] Неверный формат данных:', data);
    return userWsError('Неверный формат данных');
  }
}; 