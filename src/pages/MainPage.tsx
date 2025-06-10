import { FC, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch } from 'react-redux';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../components/BurgerIngredients/BurgerIngredients';
import { fetchIngredients } from '../services/reducers/ingredients';
import { AppDispatch } from '../store/types';
import styles from './MainPage.module.css';

const MainPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

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
};

export default MainPage; 