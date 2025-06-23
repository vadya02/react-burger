import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userOrdersConnect, userOrdersDisconnect } from '../store/userOrdersMiddleware';

export function useUserOrdersFeed(token: string) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) return;
    dispatch(userOrdersConnect(token));
    return () => {
      dispatch(userOrdersDisconnect());
    };
  }, [token, dispatch]);
} 