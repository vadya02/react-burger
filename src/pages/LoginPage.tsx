import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../store/slices/authSlice';
import { LoginCredentials } from '../store/slices/types';
import { AppDispatch, RootState } from '../store/types';
import { defaultInputEventHandlers } from '../types/events';
import styles from './AuthPage.module.css';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginPage: FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const credentials: LoginCredentials = formData;
      const result = await dispatch(loginUser(credentials)).unwrap();
      if (result.success) {
        navigate('/');
      }
    } catch (err) {
      console.error('Ошибка входа:', err);
    }
  };

  return (
    <div className={styles.center}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="E-mail"
          value={formData.email}
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass={`mb-6 ${styles.inputField}`}
          name="email"
          onChange={handleChange}
          onPointerEnterCapture={defaultInputEventHandlers.onPointerEnterCapture}
          onPointerLeaveCapture={defaultInputEventHandlers.onPointerLeaveCapture}
          onBlur={defaultInputEventHandlers.onBlur}
          onFocus={defaultInputEventHandlers.onFocus}
        />
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="Пароль"
          value={formData.password}
          icon={showPassword ? 'HideIcon' : 'ShowIcon'}
          onIconClick={() => setShowPassword(!showPassword)}
          error={false}
          errorText="Ошибка"
          size="default"
          extraClass={`mb-6 ${styles.inputField}`}
          name="password"
          onChange={handleChange}
          onPointerEnterCapture={defaultInputEventHandlers.onPointerEnterCapture}
          onPointerLeaveCapture={defaultInputEventHandlers.onPointerLeaveCapture}
          onBlur={defaultInputEventHandlers.onBlur}
          onFocus={defaultInputEventHandlers.onFocus}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass="mb-20"
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь?{' '}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{' '}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
      {error && (
        <p className="text text_type_main-default mt-4" style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </div>
  );
}; 