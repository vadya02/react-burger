import { useEffect, useRef, useState } from 'react';
import { refreshToken as apiRefreshToken } from '../services/api';
import { getCookie, setCookie } from '../utils/cookies';

export function useUserOrdersFeed(token: string) {
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return;
    let currentToken = token;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    async function handleTokenRefresh() {
      const refreshTokenValue = getCookie('refreshToken');
      if (!refreshTokenValue) {
        setError('Требуется повторная авторизация');
        return null;
      }
      const response = await apiRefreshToken(refreshTokenValue);
      if (response.success) {
        setCookie('accessToken', response.accessToken, { expires: 1200 });
        setCookie('refreshToken', response.refreshToken, { expires: 604800 });
        return response.accessToken.replace(/^Bearer /, '');
      } else {
        setError('Ошибка авторизации. Войдите заново.');
        return null;
      }
    }

    function connectWS(tokenToUse: string) {
      ws.current = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${tokenToUse}`);
      ws.current.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        if (data.success) {
          setOrders(data.orders);
          setTotal(data.total);
          setTotalToday(data.totalToday);
          setError(null);
        } else if (data.message === 'Invalid or missing token') {
          setError('Токен устарел, обновляю...');
          const newToken = await handleTokenRefresh();
          if (newToken) {
            reconnectTimeout = setTimeout(() => connectWS(newToken), 1000);
          }
        }
      };
      ws.current.onclose = () => {
        if (reconnectTimeout) clearTimeout(reconnectTimeout);
      };
    }

    connectWS(currentToken);

    return () => {
      ws.current?.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, [token]);

  return { orders, total, totalToday, error };
} 