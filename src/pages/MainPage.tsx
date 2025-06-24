import { FC, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../components/BurgerIngredients/BurgerIngredients';
import { useAppDispatch } from '../hooks/redux';
import { fetchIngredients } from '../services/reducers/ingredients';
import styles from './MainPage.module.css';

const MainPage: FC = () => {
  const dispatch = useAppDispatch();

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