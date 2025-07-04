import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logoutUser } from '../../store/slices/authSlice';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

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
            className={({ isActive }: { isActive: boolean }) =>
              `${styles.link} ${isActive || isConstructorActive ? styles.active : ''}`
            }
          >
            <span className="text text_type_main-default">Конструктор</span>
          </NavLink>
          <NavLink
            to="/feed"
            className={({ isActive }: { isActive: boolean }) =>
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
            className={({ isActive }: { isActive: boolean }) =>
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