import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import { useUserOrdersFeed } from '../hooks/useUserOrdersFeed';
import { fetchIngredients } from '../services/reducers/ingredients';
import { AppDispatch, RootState } from '../store/types';
import { getCookie } from '../utils/cookies';
import styles from './ProfilePage.module.css';

function calcOrderPrice(order: any, allIngredients: any[]) {
  return order.ingredients.reduce((sum: number, id: string) => {
    const ingredient = allIngredients.find(item => item._id === id);
    return sum + (ingredient ? ingredient.price : 0);
  }, 0);
}

export default function ProfileOrdersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const ingredients = useSelector((state: RootState) => state.ingredients.items);
  const dispatch = useDispatch<AppDispatch>();
  const accessTokenRaw = getCookie('accessToken');
  const accessToken = accessTokenRaw ? accessTokenRaw.replace('Bearer ', '') : '';
  useUserOrdersFeed(accessToken);

  const { orders, error: wsError } = useSelector((state: RootState) => state.userOrders);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

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
        {wsError && <div style={{ color: 'red' }}>{wsError}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {orders.map((order: any) => (
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