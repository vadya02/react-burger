import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Modal } from '../Modal/Modal';
import { IngredientType } from '../../utils/types';
import styles from './BurgerIngredients.module.css';

export const BurgerIngredients = ({ ingredients = [], onIngredientClick = () => {} }) => {
  const [current, setCurrent] = useState('bun');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const containerRef = useRef(null);

  const handleTabClick = (tab) => {
    setCurrent(tab);
    const refs = {
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef
    };

    refs[tab].current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const { top: containerTop } = container.getBoundingClientRect();
      
      const bunTop = bunRef.current?.getBoundingClientRect().top;
      const sauceTop = sauceRef.current?.getBoundingClientRect().top;
      const mainTop = mainRef.current?.getBoundingClientRect().top;

      const offset = 200;

      if (bunTop - containerTop <= offset) {
        setCurrent('bun');
      }
      if (sauceTop - containerTop <= offset) {
        setCurrent('sauce');
      }
      if (mainTop - containerTop <= offset) {
        setCurrent('main');
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleModalClose = () => {
    setSelectedIngredient(null);
  };

  const renderCard = (item) => (
    <article 
      className={styles.card} 
      key={item._id} 
      onClick={() => handleIngredientClick(item)}
    >
      {item.count > 0 && <Counter count={item.count} size="default" />}
      <img src={item.image} alt={item.name} className={styles.image} />
      <div className={styles.price}>
        <span className="text text_type_digits-default mr-2">{item.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>{item.name}</p>
    </article>
  );

  const buns = ingredients.filter(item => item.type === 'bun');
  const sauces = ingredients.filter(item => item.type === 'sauce');
  const mains = ingredients.filter(item => item.type === 'main');

  return (
    <>
      <section className={styles.section}>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        
        <div className={styles.tabs}>
          <Tab value="bun" active={current === 'bun'} onClick={handleTabClick}>
            Булки
          </Tab>
          <Tab value="sauce" active={current === 'sauce'} onClick={handleTabClick}>
            Соусы
          </Tab>
          <Tab value="main" active={current === 'main'} onClick={handleTabClick}>
            Начинки
          </Tab>
        </div>

        <div className={styles.ingredients} ref={containerRef}>
          <section ref={bunRef}>
            <h2 className="text text_type_main-medium mb-6">Булки</h2>
            <div className={styles.cards}>
              {buns.map(renderCard)}
            </div>
          </section>

          <section ref={sauceRef}>
            <h2 className="text text_type_main-medium mb-6">Соусы</h2>
            <div className={styles.cards}>
              {sauces.map(renderCard)}
            </div>
          </section>

          <section ref={mainRef}>
            <h2 className="text text_type_main-medium mb-6">Начинки</h2>
            <div className={styles.cards}>
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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ...IngredientType.propTypes,
      count: PropTypes.number
    })
  ).isRequired,
  onIngredientClick: PropTypes.func
};
