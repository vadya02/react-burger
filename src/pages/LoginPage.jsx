import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className={styles.center}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          extraClass="mb-6"
        />
        <Input
          type="password"
          placeholder="Пароль"
          icon="ShowIcon"
          value={password}
          onChange={e => setPassword(e.target.value)}
          extraClass="mb-6"
        />
        {error && (
          <p className="text text_type_main-default mb-4" style={{ color: 'red' }}>
            {error}
          </p>
        )}
        <Button 
          htmlType="submit" 
          type="primary" 
          size="medium" 
          extraClass="mb-20"
          disabled={isLoading}
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
        <div className={styles.textRow}>
          <span className="text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </span>
          <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
        </div>
        <div className={styles.textRow}>
          <span className="text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>
          <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
        </div>
      </form>
    </div>
  );
} 