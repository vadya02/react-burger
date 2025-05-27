import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPage.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    fetch('https://norma.nomoreparties.space/api/password-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(data => {
        if (data.success) {
          setIsSent(true);
          // Здесь позже будет редирект на /reset-password
        } else {
          setError('Ошибка отправки письма');
        }
      })
      .catch(() => setError('Ошибка отправки письма'));
  };

  return (
    <div className={styles.center}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
        <Input
          type="email"
          placeholder="Укажите e-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="mb-20">
          Восстановить
        </Button>
        {isSent && (
          <p className="text text_type_main-default mb-4" style={{ color: '#3c39ec' }}>
            Инструкция отправлена на e-mail
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