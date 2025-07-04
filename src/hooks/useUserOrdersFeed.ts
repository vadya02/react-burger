import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { socketConnect, socketDisconnect } from '../store/socketMiddleware';
import { userOrdersConfig } from '../store/userOrdersConfig';

export function useUserOrdersFeed(token: string) {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday, status, error } = useAppSelector((state) => state.userOrders);
  
  useEffect(() => {
    if (!token) {
      console.log('[useUserOrdersFeed] Токен отсутствует, пропускаем подключение');
      return;
    }
    
    console.log('[useUserOrdersFeed] Подключение с токеном:', token.substring(0, 10) + '...');
    
    dispatch(socketConnect({
      url: `wss://norma.nomoreparties.space/orders?token=${token}`,
      config: userOrdersConfig
    }));
    
    return () => {
      console.log('[useUserOrdersFeed] Отключение от WebSocket');
      dispatch(socketDisconnect(userOrdersConfig));
    };
  }, [token, dispatch]);

  return { orders, total, totalToday, status, error };
} 