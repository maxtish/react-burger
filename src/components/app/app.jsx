import React from 'react';
import AppStyles from './app.module.css';
import dataIngredients from '../../utils/data';
import AppHeader from '../appheader/appheader';
import BurgerIngredients from '../burgeringredients/burgeringredients';
import BurgerConstructor from '../burgerconstructor/burgerconstructor';

class App extends React.Component {
  render() {
    return (
      <div className={AppStyles.page}>
        <AppHeader />
        <div className={AppStyles.content}>
          <BurgerIngredients dataIngredients={dataIngredients} />
          <BurgerConstructor dataIngredients={dataIngredients} />
        </div>
      </div>
    );
  }
}

export default App;
