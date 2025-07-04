import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import styles from './FeedOrderPage.module.css';
import { Order } from '../types/order';

const statusTextMap: Record<string, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
  canceled: 'Отменён',
};

export default function ProfileOrderPage() {
  const { number } = useParams();
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://norma.nomoreparties.space/api/orders/${number}`)
      .then(res => res.json())
      .then(data => {
        if (data.orders && data.orders.length > 0) {
          setOrder(data.orders[0]);
        } else {
          setError('Заказ не найден');
        }
      })
      .catch(() => setError('Ошибка загрузки заказа'))
      .finally(() => setLoading(false));
  }, [number]);

  const orderIngredients = useMemo(() => {
    if (!order) return [];
    const counts: Record<string, number> = {};
    order.ingredients.forEach((id: string) => {
      counts[id] = (counts[id] || 0) + 1;
    });
    return Object.keys(counts)
      .map(id => {
        const ingredient = ingredients.find(i => i._id === id);
        return ingredient ? { ...ingredient, qty: counts[id] } : undefined;
      })
      .filter((item): item is (typeof ingredients)[0] & { qty: number } => Boolean(item));
  }, [order, ingredients]);

  const total = useMemo(() => {
    return orderIngredients.reduce((sum, item) => sum + (item!.price * item!.qty), 0);
  }, [orderIngredients]);

  if (loading) return <div className="text text_type_main-default p-10">Загрузка...</div>;
  if (error) return <div className="text text_type_main-default p-10">{error}</div>;
  if (!order) return null;

  const date = new Date(order.createdAt).toLocaleString('ru-RU', {
    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  });
  const statusText = statusTextMap[order.status] || order.status;

  return (
    <div className={styles.container}>
      <div className={styles.number}>#{order.number}</div>
      <div className={styles.name}>{order.name}</div>
      <div className={styles.status + ' ' + styles[order.status]}>{statusText}</div>
      <div className={styles.sectionTitle}>Состав:</div>
      <ul className={styles.ingredientsList + ' ' + (orderIngredients.length > 4 ? styles.scrollable : '')}>
        {orderIngredients.map((item) => (
          <li className={styles.ingredientRow} key={item._id}>
            <div className={styles.ingredientIconWrap}>
              <img src={item.image} alt={item.name} className={styles.ingredientIcon} />
            </div>
            <div className={styles.ingredientName}>{item.name}</div>
            <div className={styles.ingredientPrice}>
              {item.qty} x {item.price} <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.footer}>
        <div className={styles.date}>{date}</div>
        <div className={styles.total}>{total} <CurrencyIcon type="primary" /></div>
      </div>
    </div>
  );
} 