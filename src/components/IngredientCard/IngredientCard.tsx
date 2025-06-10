import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Ingredient } from '../../types/ingredient';
import styles from './IngredientCard.module.css';

interface IngredientCardProps {
  item: Ingredient;
  onClick: (item: Ingredient) => void;
  count: number;
}

interface DragItem extends Pick<Ingredient, 
  | '_id'
  | 'name'
  | 'type'
  | 'price'
  | 'image'
  | 'image_mobile'
  | 'image_large'
  | 'proteins'
  | 'fat'
  | 'carbohydrates'
  | 'calories'
> {}

interface DragCollectProps {
  isDragging: boolean;
}

export const IngredientCard: FC<IngredientCardProps> = ({ item, onClick, count }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, dragRef] = useDrag<DragItem, unknown, DragCollectProps>({
    type: 'ingredient',
    item: {
      _id: item._id,
      name: item.name,
      type: item.type,
      price: item.price,
      image: item.image,
      image_mobile: item.image_mobile,
      image_large: item.image_large,
      proteins: item.proteins,
      fat: item.fat,
      carbohydrates: item.carbohydrates,
      calories: item.calories,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  dragRef(ref);

  const handleClick = (): void => {
    onClick(item);
  };

  return (
    <div 
      ref={ref} 
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`} 
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      {count > 0 && <Counter count={count} size="default" />}
      <img 
        src={item.image} 
        alt={item.name} 
        className={styles.image}
        loading="lazy"
      />
      <div className={styles.price}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
    </div>
  );
}; 