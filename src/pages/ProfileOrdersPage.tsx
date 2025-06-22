import { useSelector } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import OrderCard from '../components/OrderCard';
import { testOrders } from '../mocks/orders';
import { RootState } from '../store/types';
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
  const orders = testOrders;
  const ingredients = useSelector((state: RootState) => state.ingredients.items);

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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {orders.map(order => (
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