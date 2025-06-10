import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logoutUser, updateUserData } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store/types';
import styles from './ProfilePage.module.css';

interface FormData {
  name: string;
  email: string;
  password: string;
}

interface UpdateData {
  name: string;
  email: string;
  password?: string;
}

interface ErrorResponse {
  message: string;
}

const ProfilePage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsEditing(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    try {
      const updateData: UpdateData = {
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
      const error = err as ErrorResponse;
      setError(error.message || 'Ошибка обновления данных');
    }
  };

  const handleCancel = (): void => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
    setIsEditing(false);
    setError('');
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/login');
    } catch (err) {
      const error = err as ErrorResponse;
      setError(error.message || 'Ошибка при выходе из системы');
    }
  };

  if (isLoading) {
    return (
      <div 
        className="text text_type_main-default p-10"
        role="status"
        aria-label="Загрузка"
      >
        Загрузка...
      </div>
    );
  }

  return (
    <div 
      className={styles.profilePage}
      role="main"
      aria-label="Страница профиля"
    >
      <nav 
        className={styles.menu}
        role="navigation"
        aria-label="Меню профиля"
      >
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
          onClick={handleLogout}
          aria-label="Выйти из системы"
        >
          <span className="text text_type_main-medium">Выход</span>
        </button>
        <p 
          className={`${styles.menuHint} text text_type_main-default text_color_inactive mt-20`}
          role="note"
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div 
        className={styles.content}
        role="region"
        aria-label="Форма профиля"
      >
        <form 
          className={styles.form} 
          onSubmit={handleSubmit} 
          autoComplete="off"
          noValidate
        >
          <h2 className="text text_type_main-medium mb-6">Профиль</h2>
          
          <Input
            type="text"
            placeholder="Имя"
            value={formData.name}
            name="name"
            onChange={handleChange}
            icon="EditIcon"
            extraClass="mb-6"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
            aria-label="Имя пользователя"
          />
          
          <Input
            type="email"
            placeholder="Логин"
            value={formData.email}
            name="email"
            onChange={handleChange}
            icon="EditIcon"
            extraClass="mb-6"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
            aria-label="Email пользователя"
          />
          
          <Input
            type="password"
            placeholder="Пароль"
            value={formData.password}
            name="password"
            onChange={handleChange}
            icon="EditIcon"
            extraClass="mb-6"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
            aria-label="Пароль пользователя"
          />

          {error && (
            <p 
              className="text text_type_main-default mb-4" 
              style={{ color: 'red' }}
              role="alert"
              aria-live="polite"
            >
              {error}
            </p>
          )}

          {isEditing && (
            <div 
              className={styles.buttons}
              role="group"
              aria-label="Кнопки управления формой"
            >
              <Button
                type="secondary"
                size="medium"
                onClick={handleCancel}
                extraClass="mr-4"
                htmlType="button"
                aria-label="Отменить изменения"
              >
                Отмена
              </Button>
              <Button
                type="primary"
                size="medium"
                htmlType="submit"
                aria-label="Сохранить изменения"
              >
                Сохранить
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfilePage; 