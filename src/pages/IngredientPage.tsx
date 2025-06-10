import { FC } from 'react';
import { IngredientDetails } from '../components/IngredientDetails/IngredientDetails';
import styles from './IngredientPage.module.css';

export const IngredientPage: FC = () => {
  return (
    <div className={styles.container}>
      <IngredientDetails />
    </div>
  );
}; 