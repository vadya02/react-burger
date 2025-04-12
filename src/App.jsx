import { Component } from 'react';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import { BurgerConstructor } from './components/BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from './components/BurgerIngredients/BurgerIngredients';
import { ingredients } from './utils/data';

export class App extends Component {
  state = {
    ingredients: ingredients ? ingredients.map(item => ({
      ...item,
      count: 0
    })) : []
  };

  handleIngredientClick = (ingredient) => {
    console.log('Выбран ингредиент:', ingredient);
  };

  render() {
    return (
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngredients 
            ingredients={this.state.ingredients}
            onIngredientClick={this.handleIngredientClick}
          />
          <BurgerConstructor 
            ingredients={this.state.ingredients}
          />
        </main>
      </div>
    );
  }
} 