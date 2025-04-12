import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';

export const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </h2>
      <img 
        src={ingredient.image_large} 
        alt={ingredient.name} 
        className={styles.image} 
      />
      <p className={`${styles.name} text text_type_main-medium`}>
        {ingredient.name}
      </p>
      <div className={styles.nutrients}>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.calories}
          </p>
        </div>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.proteins}
          </p>
        </div>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.fat}
          </p>
        </div>
        <div className={styles.nutrient}>
          <p className="text text_type_main-default text_color_inactive">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {ingredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  ingredient: PropTypes.shape({
    image_large: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
  }).isRequired,
}; 