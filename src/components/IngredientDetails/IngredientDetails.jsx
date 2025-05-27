import PropTypes from 'prop-types';
import styles from './IngredientDetails.module.css';

export const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={styles.container}>
      <img 
        src={ingredient.image_large} 
        alt={ingredient.name} 
        className={styles.image}
      />
      <p className="text text_type_main-medium mt-4 mb-8">
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
    _id: PropTypes.string,
    name: PropTypes.string,
    image_large: PropTypes.string,
    calories: PropTypes.number,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
  }).isRequired,
};

export default IngredientDetails; 