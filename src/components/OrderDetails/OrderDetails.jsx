import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './OrderDetails.module.css';

export const OrderDetails = ({ orderNumber, isLoading, hasError }) => {
  if (isLoading) {
    return <p className="text text_type_main-medium">Загрузка...</p>;
  }
  if (hasError) {
    return <p className="text text_type_main-medium text_color_error">Ошибка при создании заказа</p>;
  }
  if (!orderNumber) {
    return null;
  }
  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mb-8">{orderNumber}</p>
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

OrderDetails.propTypes = {
  orderNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
}; 