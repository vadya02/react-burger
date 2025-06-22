import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api';
import styles from './AuthPage.module.css';

const ForgotPasswordPage: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await forgotPassword(email);
      if (response.success) {
        sessionStorage.setItem('resetToken', 'true');
        navigate('/reset-password');
      }
    } catch (err: any) {
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
            name="email"
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            onBlur={() => {}}
            onFocus={() => {}}
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
};

export default ForgotPasswordPage; 