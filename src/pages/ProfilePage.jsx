import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserData, logoutUser } from '../store/slices/authSlice';
import styles from './ProfilePage.module.css';
import { NavLink, useNavigate } from 'react-router';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const updateData = {
        name: formData.name,
        email: formData.email
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      await dispatch(updateUserData(updateData)).unwrap();
      setIsEditing(false);
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (err) {
      setError(err.message || 'Ошибка обновления данных');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      password: ''
    });
    setIsEditing(false);
    setError('');
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (err) {
      // обработка ошибки выхода, если нужно
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
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
          className={styles.menuItem + ' ' + styles.exit}
          type="button"
          onClick={handleLogout}
        >
          <span className="text text_type_main-medium">Выход</span>
        </button>
        <p className={styles.menuHint + ' text text_type_main-default text_color_inactive mt-20'}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
          <h2 className="text text_type_main-medium mb-6">Профиль</h2>
          
          <Input
            type="text"
            placeholder="Имя"
            value={formData.name}
            name="name"
            onChange={handleChange}
            icon="EditIcon"
            extraClass="mb-6"
          />
          
          <Input
            type="email"
            placeholder="Логин"
            value={formData.email}
            name="email"
            onChange={handleChange}
            icon="EditIcon"
            extraClass="mb-6"
          />
          
          <Input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            name="password"
            onChange={handleChange}
            icon="EditIcon"
            extraClass="mb-6"
          />

          {error && (
            <p className="text text_type_main-default mb-4" style={{ color: 'red' }}>
              {error}
            </p>
          )}

          {isEditing && (
            <div className={styles.buttons}>
              <Button
                type="secondary"
                size="medium"
                onClick={handleCancel}
                extraClass="mr-4"
              >
                Отмена
              </Button>
              <Button
                type="primary"
                size="medium"
                htmlType="submit"
              >
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
