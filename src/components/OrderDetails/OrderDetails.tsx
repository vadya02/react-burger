import { FC } from 'react';
import styles from './OrderDetails.module.css';

interface OrderDetailsProps {
  orderNumber: number | null;
  isLoading: boolean;
  hasError: boolean;
}

interface OrderStatus {
  title: string;
  description: string;
}

export const OrderDetails: FC<OrderDetailsProps> = ({ 
  orderNumber, 
  isLoading, 
  hasError 
}) => {
  const orderStatus: OrderStatus = {
    title: 'Ваш заказ начали готовить',
    description: 'Дождитесь готовности на орбитальной станции'
  };

  if (isLoading) {
    return (
      <div 
        className="text text_type_main-default p-10"
        role="status"
        aria-label="Загрузка"
      >
        Загрузка...
      </div>
    );
  }

  if (hasError) {
    return (
      <div 
        className="text text_type_main-default p-10"
        role="alert"
        aria-label="Ошибка"
      >
        Произошла ошибка при создании заказа
      </div>
    );
  }

  return (
    <div 
      className={styles.container}
      role="status"
      aria-label="Детали заказа"
    >
      <h2 className="text text_type_digits-large mb-8">{orderNumber}</h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <p className="text text_type_main-default mb-2">{orderStatus.title}</p>
      <p className="text text_type_main-default text_color_inactive">
        {orderStatus.description}
      </p>
    </div>
  );
}; 