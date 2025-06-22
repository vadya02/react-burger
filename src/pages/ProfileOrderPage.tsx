import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { testOrders } from '../mocks/orders';

export default function ProfileOrderPage() {
  const { number } = useParams();
  const [order, setOrder] = useState(() => testOrders.find(o => o.number === number));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!order && number) {
      setLoading(true);
      fetch(`https://norma.nomoreparties.space/api/orders/${number}`)
        .then(res => res.json())
        .then(data => {
          if (data.orders && data.orders.length > 0) {
            setOrder({
              number: data.orders[0].number,
              name: data.orders[0].name,
              status: data.orders[0].status,
              ingredients: data.orders[0].ingredients.map((id: string) => ({ name: id, qty: 1, price: 0 })),
              total: data.orders[0].price || 0,
              date: data.orders[0].createdAt,
            });
          } else {
            setError('Заказ не найден');
          }
        })
        .catch(() => setError('Ошибка загрузки заказа'))
        .finally(() => setLoading(false));
    }
  }, [order, number]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>Заказ не найден</div>;

  return (
    <div>
      <h2>{order.name}</h2>
      <div>Статус: {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : 'Отменён'}</div>
      <h3>Состав:</h3>
      <ul>
        {order.ingredients.map((item, idx) => (
          <li key={idx}>
            {item.name} — {item.qty} x {item.price}
          </li>
        ))}
      </ul>
      <div>Сумма: {order.total} 💎</div>
      <div>{order.date}</div>
    </div>
  );
} 