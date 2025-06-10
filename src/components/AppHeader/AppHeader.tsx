import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router';
import { logoutUser } from '../../store/slices/authSlice';
import { AppDispatch, RootState } from '../../store/types';
import styles from './AppHeader.module.css';

export default function AppHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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