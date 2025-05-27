import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPage.module.css';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => {
        if (data.success) {
          setIsSuccess(true);
          // Здесь позже будет редирект на /login
        } else {
          setError('Ошибка сброса пароля');
        }
      })
      .catch(() => setError('Ошибка сброса пароля'));
  };

  return (
    <div className={styles.center}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type="password"
          placeholder="Введите новый пароль"
          icon="ShowIcon"
          value={password}
          onChange={e => setPassword(e.target.value)}
          extraClass="mb-6"
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          value={token}
          onChange={e => setToken(e.target.value)}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Сохранить
        </Button>
        {isSuccess && (
          <p className="text text_type_main-default mb-4" style={{ color: '#3c39ec' }}>
            Пароль успешно изменён!
          </p>
        )}
        {error && (
          <p className="text text_type_main-default mb-4" style={{ color: 'red' }}>
            {error}
          </p>
        )}
        <div className={styles.textRow}>
          <span className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?
          </span>
          <Link to="/login" className={styles.link}>Войти</Link>
        </div>
      </form>
    </div>
  );
} 