import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useUserOrdersFeed } from '../hooks/useUserOrdersFeed';
import { fetchIngredients } from '../services/reducers/ingredients';
import { getAccessToken } from '../utils/cookies';
import styles from './ProfilePage.module.css';
import { Order } from '../types/order';
import { Ingredient } from '../types/ingredient';

function calcOrderPrice(order: Order, allIngredients: Ingredient[]) {
  return order.ingredients.reduce((sum: number, id: string) => {
    const ingredient = allIngredients.find(item => item._id === id);
    return sum + (ingredient ? ingredient.price : 0);
  }, 0);
}

export default function ProfileOrdersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useAppSelector((state) => state.ingredients.items);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const accessToken = getAccessToken();
  
  console.log('[ProfileOrdersPage] isAuthenticated:', isAuthenticated);
  console.log('[ProfileOrdersPage] accessToken:', accessToken ? 'present' : 'missing');

  const { orders, total, totalToday, status, error: wsError } = useUserOrdersFeed(accessToken);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  if (!isAuthenticated) {
    return <div>Пожалуйста, войдите в систему</div>;
  }

  return (
    <div className={styles.profilePage}>
      <nav className={styles.menu}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
        >
          <span className="text text_type_main-medium">Профиль</span>
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.active : ''}`}
        >
          <span className="text text_type_main-medium">История заказов</span>
        </NavLink>
        <button
          className={`${styles.menuItem} ${styles.exit}`}
          type="button"
          // onClick={handleLogout}
          aria-label="Выйти из системы"
        >
          <span className="text text_type_main-medium">Выход</span>
        </button>
        <p className={`${styles.menuHint} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </nav>
      <div className={styles.content} style={{ minWidth: 480, maxWidth: 900, overflowY: 'auto' }}>
        <h1 className="text text_type_main-large mb-8">История заказов</h1>
        {status === 'connecting' && <div style={{ color: 'orange' }}>Подключение к серверу...</div>}
        {status === 'error' && <div style={{ color: 'red' }}>{wsError}</div>}
        {status === 'offline' && <div style={{ color: 'gray' }}>Соединение разорвано</div>}
        {status === 'online' && orders.length === 0 && <div style={{ color: 'gray' }}>Заказов пока нет</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {orders.map((order: Order) => (
            <div
              key={order.number}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/profile/orders/${order.number}`, { state: { background: location } })}
            >
              <OrderCard order={order} ingredients={ingredients} price={calcOrderPrice(order, ingredients)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 