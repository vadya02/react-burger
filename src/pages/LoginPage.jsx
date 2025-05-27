import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthPage.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={styles.center}>
      <form className={styles.form}>
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
        <Button htmlType="button" type="primary" size="medium" extraClass="mb-20">
          Войти
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