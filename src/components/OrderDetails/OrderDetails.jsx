import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderDetails.module.css';

export const OrderDetails = () => {
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mb-8">034536</p>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <div className={styles.icon}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}; 