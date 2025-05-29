import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import styles from './IngredientPage.module.css';

export default function IngredientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ingredients = useSelector(state => state.ingredients.items);
  const ingredient = ingredients.find(item => item._id === id);

  useEffect(() => {
    // if (!ingredient) {
    //   navigate('/', { replace: true });
    // }
  }, [ingredient, navigate]);

  // if (!ingredient) {
  //   return null;
  // }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="text text_type_main-large mb-8">Детали ингредиента</h1>
        <IngredientDetails />
      </div>
    </div>
  );
} 