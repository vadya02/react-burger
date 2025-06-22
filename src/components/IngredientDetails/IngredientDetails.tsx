import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchIngredients } from '../../services/reducers/ingredients';
import { AppDispatch, RootState } from '../../store/types';
import { Ingredient } from '../../types/ingredient';
import styles from './IngredientDetails.module.css';

interface IngredientDetailsProps {
  ingredient?: Ingredient;
}

interface NutritionDetail {
  label: string;
  value: number;
  unit: string;
}

export const IngredientDetails: FC<IngredientDetailsProps> = ({ ingredient }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector((state: RootState) => state.ingredients.items);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  const foundIngredient = ingredient || ingredients.find(item => item._id === id);

  if (!ingredients.length && !ingredient) {
    return <div className="text text_type_main-default p-10">Загрузка...</div>;
  }

  if (!foundIngredient) {
    return <div className="text text_type_main-default p-10">Ингредиент не найден</div>;
  }

  const nutritionDetails: NutritionDetail[] = [
    { label: 'Калории,ккал', value: foundIngredient.calories, unit: '' },
    { label: 'Белки, г', value: foundIngredient.proteins, unit: 'г' },
    { label: 'Жиры, г', value: foundIngredient.fat, unit: 'г' },
    { label: 'Углеводы, г', value: foundIngredient.carbohydrates, unit: 'г' }
  ];

  return (
    <div className={styles.container}>
      <img
        src={foundIngredient.image_large}
        alt={foundIngredient.name}
        className={styles.image}
      />
      <h3 className="text text_type_main-medium mt-4 mb-8">{foundIngredient.name}</h3>
      <div className={styles.details}>
        {nutritionDetails.map(({ label, value, unit }) => (
          <div key={label} className={styles.detail}>
            <span className="text text_type_main-default text_color_inactive">
              {label}
            </span>
            <span className="text text_type_digits-default mt-2">
              {value}{unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}; 