import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderDetails.module.css';

export const OrderDetails = () => {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.orderId} text text_type_digits-large`}>034536</h2>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <div className={styles.imageContainer}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}; 