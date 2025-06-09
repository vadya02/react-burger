import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/reducers/ingredients';
import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';

export default function IngredientDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ingredients = useSelector(state => state.ingredients.items);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const ingredient = ingredients.find(item => item._id === id);

  if (!ingredients.length) {
    return <div className="text text_type_main-default p-10">Загрузка...</div>;
  }

  if (!ingredient) {
    return <div className="text text_type_main-default p-10">Ингредиент не найден</div>;
  }

  return (
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