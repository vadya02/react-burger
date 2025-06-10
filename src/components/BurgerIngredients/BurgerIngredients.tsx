import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/types';
import { Ingredient } from '../../types/ingredient';
import { IngredientCard } from '../IngredientCard/IngredientCard';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Modal } from '../Modal/Modal';
import styles from './BurgerIngredients.module.css';

type TabType = 'bun' | 'sauce' | 'main';

export const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState<TabType>('bun');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const ingredients = useSelector((state: RootState) => state.ingredients.items);
  const bunRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { bun, ingredients: constructorIngredients } = useSelector((state: RootState) => state.burgerConstructor);

  const handleTabClick = (tab: TabType): void => {
    setCurrent(tab);
    const refs = {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef
    };
    refs[tab].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = (): void => {
    if (!containerRef.current || !bunRef.current || !sauceRef.current || !mainRef.current) return;

    const containerTop = containerRef.current.getBoundingClientRect().top;

    const bunTop = Math.abs(bunRef.current.getBoundingClientRect().top - containerTop);
    const sauceTop = Math.abs(sauceRef.current.getBoundingClientRect().top - containerTop);
    const mainTop = Math.abs(mainRef.current.getBoundingClientRect().top - containerTop);

    const min = Math.min(bunTop, sauceTop, mainTop);

    if (min === bunTop) {
      setCurrent('bun');
    } else if (min === sauceTop) {
      setCurrent('sauce');
    } else {
      setCurrent('main');
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIngredientClick = (ingredient: Ingredient): void => {
    setSelectedIngredient(ingredient);
  };

  const handleModalClose = (): void => {
    setSelectedIngredient(null);
  };

  const getCount = (item: Ingredient): number => {
    if (item.type === 'bun') {
      return bun && bun._id === item._id ? 2 : 0;
    }
    return constructorIngredients.filter(i => i._id === item._id).length;
  };

  const renderCard = (item: Ingredient) => (
    <IngredientCard
      key={item._id}
      item={item}
      onClick={handleIngredientClick}
      count={getCount(item)}
    />
  );

  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const mains = ingredients.filter(item => item.type === 'main');

  return (
    <>
      <section 
        className={styles.section}
        role="region"
        aria-label="Ингредиенты для бургера"
      >
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        
        <div 
          className={styles.tabs}
          role="tablist"
          aria-label="Категории ингредиентов"
        >
          <Tab 
            value="bun" 
            active={current === 'bun'} 
            onClick={() => handleTabClick('bun')}
            aria-selected={current === 'bun'}
          >
            Булки
          </Tab>
          <Tab 
            value="sauce" 
            active={current === 'sauce'} 
            onClick={() => handleTabClick('sauce')}
            aria-selected={current === 'sauce'}
          >
            Соусы
          </Tab>
          <Tab 
            value="main" 
            active={current === 'main'} 
            onClick={() => handleTabClick('main')}
            aria-selected={current === 'main'}
          >
            Начинки
          </Tab>
        </div>

        <div 
          className={styles.ingredients} 
          ref={containerRef}
          role="tabpanel"
          aria-label={`Список ${current === 'bun' ? 'булок' : current === 'sauce' ? 'соусов' : 'начинок'}`}
        >
          <section 
            ref={bunRef}
            role="region"
            aria-label="Булки"
          >
            <h2 className="text text_type_main-medium mb-6">Булки</h2>
            <div 
              className={styles.cards}
              role="list"
              aria-label="Список булок"
            >
              {buns.map(renderCard)}
            </div>
          </section>

          <section 
            ref={sauceRef}
            role="region"
            aria-label="Соусы"
          >
            <h2 className="text text_type_main-medium mb-6">Соусы</h2>
            <div 
              className={styles.cards}
              role="list"
              aria-label="Список соусов"
            >
              {sauces.map(renderCard)}
            </div>
          </section>

          <section 
            ref={mainRef}
            role="region"
            aria-label="Начинки"
          >
            <h2 className="text text_type_main-medium mb-6">Начинки</h2>
            <div 
              className={styles.cards}
              role="list"
              aria-label="Список начинок"
            >
              {mains.map(renderCard)}
            </div>
          </section>
        </div>
      </section>

      {selectedIngredient && (
        <Modal 
          title="Детали ингредиента"
          onClose={handleModalClose}
        >
          <IngredientDetails ingredient={selectedIngredient} />
        </Modal>
      )}
    </>
  );
}; 