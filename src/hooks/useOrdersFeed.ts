import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { socketConnect, socketDisconnect } from '../store/socketMiddleware';
import { wsOrdersConfig } from '../store/wsOrdersConfig';

export function useOrdersFeed() {
  const dispatch = useAppDispatch();
  const { orders, total, totalToday, status } = useAppSelector((state) => state.wsOrders);

  useEffect(() => {
    dispatch(socketConnect({
      url: 'wss://norma.nomoreparties.space/orders/all',
      config: wsOrdersConfig
    }));
    
    return () => {
      dispatch(socketDisconnect(wsOrdersConfig));
    };
  }, [dispatch]);

  return { orders, total, totalToday, status };
} 