import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../services/api';
import styles from './AuthPage.module.css';

export default function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        sessionStorage.setItem('resetToken', 'true');
        navigate('/reset-password');
      }
    } catch (err) {
      setError(err.message || 'Ошибка при отправке кода восстановления');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
          
          <Input
            type="email"
            placeholder="Укажите e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            extraClass="mb-6"
          />

          {error && (
            <p className="text text_type_main-default mb-4" style={{ color: 'red' }}>
              {error}
            </p>
          )}

          <Button
            type="primary"
            size="medium"
            htmlType="submit"
            extraClass="mb-20"
          >
            Восстановить
          </Button>

          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{' '}
            <button
              type="button"
              className={styles.link}
              onClick={() => navigate('/login')}
            >
              Войти
            </button>
          </p>
        </form>
      </div>
    </div>
  );
} 