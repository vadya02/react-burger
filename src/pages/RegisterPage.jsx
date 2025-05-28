import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../store/slices/authSlice';
import styles from './AuthPage.module.css';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser({ email, password, name }));
    if (registerUser.fulfilled.match(result)) {
      navigate('/');
    }
  };

  return (
    <div className={styles.center}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <Input
          type="text"
          placeholder="Имя"
          value={name}
          onChange={e => setName(e.target.value)}
          extraClass="mb-6"
        />
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
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
        <div className={styles.textRow}>
          <span className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы?
          </span>
          <Link to="/login" className={styles.link}>Войти</Link>
        </div>
      </form>
    </div>
  );
} 