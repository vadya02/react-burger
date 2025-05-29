import { NavLink, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isProfileActive = location.pathname.startsWith('/profile');
  const isConstructorActive = location.pathname === '/';

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.link} ${isActive || isConstructorActive ? styles.active : ''}`
            }
          >
            <span className="text text_type_main-default">Конструктор</span>
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            <span className="text text_type_main-default">Лента заказов</span>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </div>

        <div className={styles.right}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${styles.link} ${isActive || isProfileActive ? styles.active : ''}`
            }
          >
            <span className="text text_type_main-default">
              {isAuthenticated ? 'Личный кабинет' : 'Войти'}
            </span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}