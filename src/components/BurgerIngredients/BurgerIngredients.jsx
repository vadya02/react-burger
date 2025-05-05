import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { IngredientCard } from '../IngredientCard/IngredientCard';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Modal } from '../Modal/Modal';
import styles from './BurgerIngredients.module.css';

export const BurgerIngredients = ({ ingredients = [], onIngredientClick = () => {} }) => {
  const [current, setCurrent] = useState('bun');
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const containerRef = useRef(null);

  const { bun, ingredients: constructorIngredients } = useSelector(state => state.burgerConstructor);

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

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const handleModalClose = () => {
    setSelectedIngredient(null);
  };

  const getCount = (item) => {
    if (item.type === 'bun') {
      return bun && bun._id === item._id ? 2 : 0;
    }
    return constructorIngredients.filter(i => i._id === item._id).length;
  };

  const renderCard = (item) => (
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
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      count: PropTypes.number,
    })
  ).isRequired,
  onIngredientClick: PropTypes.func,
};
