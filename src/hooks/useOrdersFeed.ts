import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types';
import { wsOrdersConnect, wsOrdersDisconnect } from '../store/wsOrdersMiddleware';

export function useOrdersFeed() {
  const dispatch = useDispatch();
  const { orders, total, totalToday, status } = useSelector((state: RootState) => state.wsOrders);

  useEffect(() => {
    dispatch(wsOrdersConnect());
    return () => {
      dispatch(wsOrdersDisconnect());
    };
  }, [dispatch]);

  return { orders, total, totalToday, status };
} 