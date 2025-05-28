import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Modal } from '../Modal/Modal';
import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';

export default function IngredientDetails() {
  const { id } = useParams();
  const ingredients = useSelector(state => state.ingredients.items);
  const ingredient = ingredients.find(item => item._id === id);

  if (!ingredient) {
    return null;
  }

  const content = (
    <div className={styles.container}>
      <img
        src={ingredient.image_large}
        alt={ingredient.name}
        className={styles.image}
      />
      <h3 className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</h3>
      <div className={styles.details}>
        <div className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </span>
          <span className="text text_type_digits-default mt-2">
            {ingredient.calories}
          </span>
        </div>
        <div className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Белки, г
          </span>
          <span className="text text_type_digits-default mt-2">
            {ingredient.proteins}
          </span>
        </div>
        <div className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Жиры, г
          </span>
          <span className="text text_type_digits-default mt-2">
            {ingredient.fat}
          </span>
        </div>
        <div className={styles.detail}>
          <span className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </span>
          <span className="text text_type_digits-default mt-2">
            {ingredient.carbohydrates}
          </span>
        </div>
      </div>
    </div>
  );

  if (window.location.pathname === '/') {
    return <Modal>{content}</Modal>;
  }

  return content;
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }),
}; 