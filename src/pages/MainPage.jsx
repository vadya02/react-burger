import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchIngredients } from '../services/reducers/ingredients';
import { BurgerIngredients } from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styles from './MainPage.module.css';

export default function MainPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className={styles.main}>
        <div className={styles.left}>
          <BurgerIngredients />
        </div>
        <div className={styles.right}>
          <BurgerConstructor />
        </div>
      </main>
    </DndProvider>
  );
} 