import { Counter, CurrencyIcon, Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Modal } from '../Modal/Modal';
import styles from './BurgerIngredients.module.css';

export class BurgerIngredients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'bun',
      selectedIngredient: null
    };
    
    this.bunRef = React.createRef();
    this.sauceRef = React.createRef();
    this.mainRef = React.createRef();
    this.containerRef = React.createRef();
  }

  static propTypes = {
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
        count: PropTypes.number
      })
    ).isRequired,
    onIngredientClick: PropTypes.func
  };

  static defaultProps = {
    ingredients: [],
    onIngredientClick: () => {}
  };

  handleTabClick = (tab) => {
    this.setState({ current: tab });
    const ref = {
      bun: this.bunRef,
      sauce: this.sauceRef,
      main: this.mainRef
    }[tab];

    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  handleScroll = () => {
    if (this.containerRef.current) {
      const container = this.containerRef.current;
      const { top: containerTop } = container.getBoundingClientRect();
      
      const bunTop = this.bunRef.current?.getBoundingClientRect().top;
      const sauceTop = this.sauceRef.current?.getBoundingClientRect().top;
      const mainTop = this.mainRef.current?.getBoundingClientRect().top;

      const offset = 200;

      if (bunTop - containerTop <= offset) {
        this.setState({ current: 'bun' });
      }
      if (sauceTop - containerTop <= offset) {
        this.setState({ current: 'sauce' });
      }
      if (mainTop - containerTop <= offset) {
        this.setState({ current: 'main' });
      }
    }
  };

  componentDidMount() {
    this.containerRef.current?.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    this.containerRef.current?.removeEventListener('scroll', this.handleScroll);
  }

  handleIngredientClick = (ingredient) => {
    this.setState({ selectedIngredient: ingredient });
  };

  handleModalClose = () => {
    this.setState({ selectedIngredient: null });
  };

  renderCard = (item) => (
    <article 
      className={styles.card} 
      key={item._id} 
      onClick={() => this.handleIngredientClick(item)}
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

  render() {
    const { ingredients } = this.props;
    const buns = ingredients.filter(item => item.type === 'bun');
    const sauces = ingredients.filter(item => item.type === 'sauce');
    const mains = ingredients.filter(item => item.type === 'main');

    return (
      <>
        <section className={styles.section}>
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          
          <div className={styles.tabs}>
            <Tab value="bun" active={this.state.current === 'bun'} onClick={this.handleTabClick}>
              Булки
            </Tab>
            <Tab value="sauce" active={this.state.current === 'sauce'} onClick={this.handleTabClick}>
              Соусы
            </Tab>
            <Tab value="main" active={this.state.current === 'main'} onClick={this.handleTabClick}>
              Начинки
            </Tab>
          </div>

          <div className={styles.ingredients} ref={this.containerRef} onScroll={this.handleScroll}>
            <section ref={this.bunRef}>
              <h2 className="text text_type_main-medium mb-6">Булки</h2>
              <div className={styles.cards}>
                {buns.map(this.renderCard)}
              </div>
            </section>

            <section ref={this.sauceRef}>
              <h2 className="text text_type_main-medium mb-6">Соусы</h2>
              <div className={styles.cards}>
                {sauces.map(this.renderCard)}
              </div>
            </section>

            <section ref={this.mainRef}>
              <h2 className="text text_type_main-medium mb-6">Начинки</h2>
              <div className={styles.cards}>
                {mains.map(this.renderCard)}
              </div>
            </section>
          </div>
        </section>
        {this.state.selectedIngredient && (
          <Modal onClose={this.handleModalClose}>
            <IngredientDetails ingredient={this.state.selectedIngredient} />
          </Modal>
        )}
      </>
    );
  }
}
