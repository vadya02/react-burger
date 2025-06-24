import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './OrderCard.module.css';
import { Order } from '../types/order';
import { Ingredient } from '../types/ingredient';

interface OrderCardProps {
  order: Order;
  ingredients: Ingredient[];
  price?: number;
}

const statusTextMap: Record<string, string> = {
  done: 'Выполнен',
  pending: 'Готовится',
  created: 'Создан',
  canceled: 'Отменён',
};

export default function OrderCard({ order, ingredients, price }: OrderCardProps) {
  // Форматирование даты
  const date = new Date(order.createdAt).toLocaleString('ru-RU', {
    day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit',
  });
  const statusText = statusTextMap[order.status] || order.status;

  const uniqueIngredients = order.ingredients.slice(0, 6);
  const more = order.ingredients.length > 6 ? order.ingredients.length - 6 : 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.number}>#{order.number}</span>
        <span className={styles.date}>{date}</span>
      </div>
      <div className={styles.name}>{order.name}</div>
      <div className={styles.status + ' ' + styles[order.status]}>{statusText}</div>
      <div className={styles.ingredientsRow}>
        {uniqueIngredients.map((id: string, idx: number) => {
          const ingredient = ingredients.find(i => i._id === id);
          if (!ingredient) return null;
          return (
            <div
              key={id + idx}
              className={styles.ingredientIcon}
              style={{
                left: `${idx * 36}px`,
                zIndex: 10 - idx,
                boxShadow: '0 0 8px 2px #6016fc, 0 0 0 2px #6016fc'
              }}
            >
              <img src={ingredient.image} alt={ingredient.name} />
            </div>
          );
        })}
        {more > 0 && (
          <div
            className={styles.more}
            style={{
              left: `${6 * 36}px`,
              zIndex: 0,
              boxShadow: '0 0 8px 2px #6016fc, 0 0 0 2px #6016fc'
            }}
          >
            +{more}
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <span className={styles.price}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  );
} 