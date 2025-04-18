import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientType } from '../../utils/types';
import styles from './BurgerConstructor.module.css';

export class BurgerConstructor extends Component {
  state = {
    isOrderModalOpen: false
  };

  handleOrderClick = () => {
    this.setState({ isOrderModalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ isOrderModalOpen: false });
  };

  static propTypes = {
    ingredients: PropTypes.arrayOf(IngredientType),
    onOrderClick: PropTypes.func,
    totalPrice: PropTypes.number
  };

  static defaultProps = {
    ingredients: [],
    onOrderClick: () => {},
    totalPrice: 0
  };

  render() {
    return (
      <>
        <section className={`${styles.section} pt-25 pl-4`}>
          <div className={styles.elements}>
            <div className={`${styles.element} pl-8`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text="Краторная булка N-200i (верх)"
                price={20}
                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
              />
            </div>

            <div className={styles.scrollable}>
              <div className={`${styles.element} pl-8`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text="Соус традиционный галактический"
                  price={30}
                  thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}
                />
              </div>
              {/* Другие ингредиенты */}
            </div>

            <div className={`${styles.element} pl-8`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text="Краторная булка N-200i (низ)"
                price={20}
                thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
              />
            </div>
          </div>

          <div className={`${styles.total} pt-10`}>
            <div className={styles.price}>
              <span className="text text_type_digits-medium mr-2">610</span>
              <CurrencyIcon type="primary" />
            </div>
            <Button 
              type="primary" 
              size="large" 
              onClick={this.handleOrderClick}
            >
              Оформить заказ
            </Button>
          </div>
        </section>

        {this.state.isOrderModalOpen && (
          <Modal onClose={this.handleModalClose}>
            <OrderDetails />
          </Modal>
        )}
      </>
    );
  }
}
