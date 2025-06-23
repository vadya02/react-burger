import { Middleware } from '@reduxjs/toolkit';
import {
  userWsClose,
  userWsConnecting,
  userWsError,
  userWsMessage,
  userWsOpen
} from './userOrdersSlice';

const USER_ORDERS_CONNECT = 'USER_ORDERS_CONNECT';
const USER_ORDERS_DISCONNECT = 'USER_ORDERS_DISCONNECT';

export const userOrdersConnect = (token: string) => ({ type: USER_ORDERS_CONNECT, payload: token });
export const userOrdersDisconnect = () => ({ type: USER_ORDERS_DISCONNECT });

export const userOrdersMiddleware: Middleware = store => {
  let socket: WebSocket | null = null;
  let reconnectTimeout: NodeJS.Timeout | null = null;

  return next => (action: any) => {
    switch (action.type) {
      case USER_ORDERS_CONNECT: {
        if (socket) socket.close();
        store.dispatch(userWsConnecting());
        const token = action.payload;
        socket = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${token}`);

        socket.onopen = () => {
          store.dispatch(userWsOpen());
        };
        socket.onclose = () => {
          store.dispatch(userWsClose());
        };
        // socket.onerror = () => {
        //   store.dispatch(userWsError('Ошибка соединения с сервером'));
        // };
        socket.onmessage = async (event) => {
          const data = JSON.parse(event.data);
          if (data.success) {
            store.dispatch(userWsMessage({ orders: data.orders, total: data.total, totalToday: data.totalToday }));
          } else if (data.message === 'Invalid or missing token') {
            store.dispatch(userWsError('Токен устарел или отсутствует. Требуется повторная авторизация.'));
            // Здесь можно реализовать refreshToken и повторное подключение
          }
        };
        break;
      }
      case USER_ORDERS_DISCONNECT: {
        if (socket) {
          socket.close();
          socket = null;
        }
        break;
      }
      default:
        break;
    }
    return next(action);
  };
}; 