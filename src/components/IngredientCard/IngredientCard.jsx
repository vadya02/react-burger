import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './IngredientCard.module.css';

export const IngredientCard = ({ item, onClick, count }) => {
  const [, dragRef] = useDrag({
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
  });

  return (
    <div ref={dragRef} className={styles.card} onClick={() => onClick(item)}>
      {count > 0 && <Counter count={count} size="default" />}
      <img src={item.image} alt={item.name} className={styles.image} />
      <div className={styles.price}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
    </div>
  );
};

IngredientCard.propTypes = {
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}; 