import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addIngredient, clearConstructor, moveIngredient, removeIngredient } from '../../services/reducers/constructor';
import { clearOrder, createOrder } from '../../services/reducers/order';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
import { DraggableConstructorItem } from './DraggableConstructorItem';
import { useNavigate } from 'react-router';

export default function BurgerConstructor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(state => state.burgerConstructor);
  const { number: orderNumber, isLoading: orderLoading, hasError: orderError } = useSelector(state => state.order);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [, dropRef] = useDrop({
    accept: ['ingredient', 'constructor-ingredient'],
    drop: (dragged) => {
      if (dragged && dragged._id && dragged.name) {
        dispatch(addIngredient(dragged));
      }
    },
  });

  const moveCard = (dragIndex, hoverIndex) => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  const handleDelete = (uuid) => {
    dispatch(removeIngredient(uuid));
  };

  const totalPrice = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce((sum, item) => sum + item.price, 0);
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  const handleOrderClick = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    if (!bun) {
      setError('Добавьте булку');
      return;
    }

    if (ingredients.length === 0) {
      setError('Добавьте начинку');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const orderData = [
        bun._id,
        ...ingredients.map(item => item._id),
        bun._id
      ];
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearConstructor());
      setIsOrderModalOpen(true);
    } catch (err) {
      setError(err.message || 'Ошибка при создании заказа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsOrderModalOpen(false);
    dispatch(clearOrder());
  };

  return (
    <>
      <section ref={dropRef} className={`${styles.section} pt-25 pl-4`}>
        <div className={styles.elements}>
          {bun && (
            <div className={`${styles.element} pl-8`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (верх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}

          <div className={styles.scrollable}>
            {ingredients.map((item, index) => (
              <DraggableConstructorItem
                key={item.uuid}
                item={item}
                index={index}
                moveCard={moveCard}
                handleDelete={handleDelete}
              />
            ))}
          </div>

          {bun && (
            <div className={`${styles.element} pl-8`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
            </div>
          )}
        </div>

        <div className={`${styles.total} pt-10`}>
          <div className={styles.price}>
            <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
          <Button 
            type="primary" 
            size="large" 
            onClick={handleOrderClick}
            disabled={isLoading || !bun || ingredients.length === 0}
          >
            {isLoading ? 'Оформление...' : 'Оформить заказ'}
          </Button>
        </div>
      </section>

      {isOrderModalOpen && (
        <Modal 
          title="Оформление заказа"
          onClose={handleModalClose}
        >
          <OrderDetails
            orderNumber={orderNumber}
            isLoading={orderLoading}
            hasError={orderError}
          />
        </Modal>
      )}

      {error && (
        <p className="text text_type_main-default mt-4" style={{ color: 'red' }}>
          {error}
        </p>
      )}
    </>
  );
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      proteins: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      carbohydrates: PropTypes.number.isRequired,
      calories: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      image_mobile: PropTypes.string.isRequired,
      image_large: PropTypes.string.isRequired,
    })
  ),
  onOrderClick: PropTypes.func,
  totalPrice: PropTypes.number,
};
