import { useEffect, useRef, useState } from 'react';

export function useOrdersFeed() {
  const [orders, setOrders] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalToday, setTotalToday] = useState(0);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('wss://norma.nomoreparties.space/orders/all');
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.success) {
        setOrders(data.orders);
        setTotal(data.total);
        setTotalToday(data.totalToday);
      }
    };
    return () => {
      ws.current?.close();
    };
  }, []);

  return { orders, total, totalToday };
} 