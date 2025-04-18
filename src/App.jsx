import { useState, useEffect } from 'react';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import { BurgerConstructor } from './components/BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from './components/BurgerIngredients/BurgerIngredients';
import { NORMA_API } from './utils/constants';

export const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    getIngredients();
  }, []);

  const getIngredients = () => {
    setIsLoading(true);
    setHasError(false);

    fetch(`${NORMA_API}/ingredients`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Ошибка ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setIngredients(data.data.map(item => ({
          ...item,
          count: 0
        })));
      })
      .catch(err => {
        console.error('Ошибка при получении ингредиентов:', err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleIngredientClick = (ingredient) => {
    console.log('Выбран ингредиент:', ingredient);
  };


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
        <BurgerIngredients 
          ingredients={ingredients}
          onIngredientClick={handleIngredientClick}
        />
        <BurgerConstructor 
          ingredients={ingredients}
        />
      </main>
    </div>
  );
} 