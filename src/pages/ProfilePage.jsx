import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { getUser, updateUser } from '../services/actions/auth';
import styles from './AuthPage.module.css';
export default function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) setForm({ name: user.name, email: user.email, password: '' });
  }, [user]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSave = e => {
    e.preventDefault();
    dispatch(updateUser({ name: form.name, email: form.email, password: form.password }));
    setEdit(false);
  };

  const onCancel = () => {
    setForm({ name: user.name, email: user.email, password: '' });
    setEdit(false);
  };

  return (
    <div className={styles.profileWrapper}>
      <nav className={styles.profileNav}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            isActive
              ? `${styles.profileLink} text text_type_main-medium ${styles.active}`
              : `${styles.profileLink} text text_type_main-medium`
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            isActive
              ? `${styles.profileLink} text text_type_main-medium ${styles.active}`
              : `${styles.profileLink} text text_type_main-medium`
          }
        >
          История заказов
        </NavLink>
        <button className={`${styles.profileLink} text text_type_main-medium ${styles.exitBtn}`}>
          Выход
        </button>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <form onSubmit={onSave} className={styles.profileForm}>
        <Input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Имя"
          disabled={!edit}
          extraClass="mb-6"
        />
        <Input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="E-mail"
          disabled={!edit}
          extraClass="mb-6"
        />
        <Input
          name="password"
          value={form.password}
          onChange={onChange}
          placeholder="Пароль"
          type="password"
          disabled={!edit}
          extraClass="mb-6"
        />
        {edit ? (
          <>
            <Button htmlType="submit" type="primary" size="medium">Сохранить</Button>
            <Button type="secondary" size="medium" onClick={onCancel}>Отмена</Button>
          </>
        ) : (
          <Button type="primary" size="medium" onClick={() => setEdit(true)}>Редактировать</Button>
        )}
      </form>
      {/* Здесь будет Outlet для вложенных роутов, например, /profile/orders */}
      <Outlet />
    </div>
  );
}
