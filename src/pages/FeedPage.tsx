import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import { useOrdersFeed } from '../hooks/useOrdersFeed';
import { fetchIngredients } from '../services/reducers/ingredients';
import { AppDispatch, RootState } from '../store/types';
import styles from './FeedPage.module.css';

function calcOrderPrice(order: any, allIngredients: any[]) {
  return order.ingredients.reduce((sum: number, id: string) => {
    const ingredient = allIngredients.find(item => item._id === id);
    return sum + (ingredient ? ingredient.price : 0);
  }, 0);
}

function splitColumns(arr: any[], size: number) {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export default function FeedPage() {
  const { orders, total, totalToday } = useOrdersFeed();
  const ingredients = useSelector((state: RootState) => state.ingredients.items);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const ready = orders.filter(o => o.status === 'done');
  const pending = orders.filter(o => o.status === 'pending');

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  return (
    <div className={styles.container}>
      <section className={styles.orders}>
        <h1>Лента заказов</h1>
        {orders.map(order => (
          <Link
            to={`/feed/${order.number}`}
            key={order.number}
            style={{ textDecoration: 'none' }}
            state={{ background: location }}
          >
            <OrderCard order={order} ingredients={ingredients} price={calcOrderPrice(order, ingredients)} />
          </Link>
        ))}
      </section>
      <aside className={styles.aside}>
        <div className={styles.statusColumns}>
          <div>
            <div className={styles.statusTitle}>Готовы:</div>
            <div className={styles.readyColumns}>
              {splitColumns(ready, 10).map((col, i) => (
                <div key={i} className={styles.readyCol}>
                  {col.map(order => (
                    <div key={order.number} className={styles.readyNumber}>{order.number}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.statusTitle}>В работе:</div>
            <div className={styles.pendingColumns}>
              {splitColumns(pending, 10).map((col, i) => (
                <div key={i} className={styles.pendingCol}>
                  {col.map(order => (
                    <div key={order.number} className={styles.pendingNumber}>{order.number}</div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.totalsBlock}>
          <div className={styles.totalsTitle}>Выполнено за все время:</div>
          <div className={styles.totalsNumber}>{total.toLocaleString('ru-RU')}</div>
          <div className={styles.totalsTitle}>Выполнено за сегодня:</div>
          <div className={styles.totalsNumber}>{totalToday.toLocaleString('ru-RU')}</div>
        </div>
      </aside>
    </div>
  );
} 