import React from 'react';
import BurgerIngredientsStyles from './burgeringredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState('one');
  const buns = props.dataIngredients.filter((item) => item.type === 'bun');
  const mains = props.dataIngredients.filter((item) => item.type === 'main');
  const sauces = props.dataIngredients.filter((item) => item.type === 'sauce');

  return (
    <>
      <section>
        <h1 className={BurgerIngredientsStyles.title}>Соберите Бургер</h1>
        <div style={{ display: 'flex' }}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Соусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Булки
          </Tab>
        </div>
      </section>
      <section>
        <ul>
          <li></li>
        </ul>
        <ul></ul>
        <ul></ul>
      </section>
    </>
  );
};

export default BurgerIngredients;
