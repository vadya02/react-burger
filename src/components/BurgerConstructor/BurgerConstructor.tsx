import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { addIngredient, clearConstructor, moveIngredient, removeIngredient } from '../../services/reducers/constructor';
import { clearOrder, createOrder } from '../../services/reducers/order';
import { AppDispatch, RootState } from '../../store/types';
import { Ingredient } from '../../types/ingredient';
import { OrderRequest } from '../../types/order';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import styles from './BurgerConstructor.module.css';
import { DraggableConstructorItem } from './DraggableConstructorItem';

interface DragItem extends Ingredient {
  uuid?: string;
}

interface ConstructorIngredient extends Ingredient {
  uuid: string;
}

interface OrderError extends Error {
  message: string;
}

interface DropCollectProps {
  isOver: boolean;
  canDrop: boolean;
}

const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { bun, ingredients } = useSelector((state: RootState) => state.burgerConstructor);
  const constructorIngredients = ingredients as ConstructorIngredient[];
  const { number: orderNumber, loading: orderLoading, error: orderError } = useSelector((state: RootState) => state.order);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [{ isOver, canDrop }, dropRef] = useDrop<DragItem, void, DropCollectProps>({
    accept: ['ingredient', 'constructor-ingredient'],
    drop: (dragged) => {
      if (dragged && dragged._id && dragged.name) {
        dispatch(addIngredient(dragged));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const moveCard = (dragIndex: number, hoverIndex: number): void => {
    dispatch(moveIngredient({ dragIndex, hoverIndex }));
  };

  const handleDelete = (uuid: string): void => {
    dispatch(removeIngredient(uuid));
  };

  const totalPrice = useMemo<number>(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = constructorIngredients.reduce((sum, item) => sum + item.price, 0);
    return bunPrice + ingredientsPrice;
  }, [bun, constructorIngredients]);

  const handleOrderClick = async (): Promise<void> => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    if (!bun) {
      setError('Добавьте булку');
      return;
    }

    if (constructorIngredients.length === 0) {
      setError('Добавьте начинку');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const orderData: OrderRequest = {
        ingredients: [
          bun._id,
          ...constructorIngredients.map(item => item._id),
          bun._id
        ]
      };
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearConstructor(undefined));
      setIsOrderModalOpen(true);
    } catch (err) {
      const error = err as OrderError;
      setError(error.message || 'Ошибка при создании заказа');
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = (): void => {
    setIsOrderModalOpen(false);
    dispatch(clearOrder());
  };

  const isDropActive = isOver && canDrop;

  return (
    <>
      <section 
        ref={dropRef as unknown as React.RefObject<HTMLElement>} 
        className={`${styles.section} pt-25 pl-4 ${isDropActive ? styles.dropActive : ''}`}
        role="region"
        aria-label="Конструктор бургера"
      >
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

          <div 
            className={styles.scrollable}
            role="list"
            aria-label="Начинка бургера"
          >
            {constructorIngredients.map((item, index) => (
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
            htmlType="button"
            type="primary" 
            size="large" 
            onClick={handleOrderClick}
            disabled={isLoading || !bun || constructorIngredients.length === 0}
            aria-label={isLoading ? 'Оформление заказа...' : 'Оформить заказ'}
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
            hasError={!!orderError}
          />
        </Modal>
      )}

      {error && (
        <p 
          className="text text_type_main-default mt-4" 
          style={{ color: 'red' }}
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </>
  );
};

export default BurgerConstructor; 