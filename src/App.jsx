import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import { BurgerConstructor } from './components/BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from './components/BurgerIngredients/BurgerIngredients';
import { fetchIngredients } from './services/reducers/ingredients';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.ingredients.isLoading)
  const hasError = useSelector(state => state.ingredients.hasError)

  useEffect(() => {
    dispatch(fetchIngredients())
  }, []);


  if (hasError) {
    return <p className="text text_type_main-default">Произошла ошибка при получении данных</p>;
  }

  if (isLoading) {
    return <p className="text text_type_main-default">Загрузка...</p>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
} 