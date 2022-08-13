import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burgeringredients.module.css';
import { Tab, CurrencyIcon, Counter, Typography } from '@ya.praktikum/react-developer-burger-ui-components';

const RenderIngredient = ({ arr }) => {
  return (
    <ul className={BurgerIngredientsStyles.list}>
      {arr.map((item) => (
        <li className={BurgerIngredientsStyles.item} key={item._id}>
          {item.__v > 0 && <Counter count={item.__v} size="default" />}

          <img src={item.image} alt={item.name} />
          <div className={BurgerIngredientsStyles.price}>
            <p className={`text text_type_digits-default ${BurgerIngredientsStyles.pricenumb}`}>{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={BurgerIngredientsStyles.text}>{item.name}</p>
        </li>
      ))}
    </ul>
  );
};

const BurgerIngredients = (props) => {
  const [current, setCurrent] = React.useState('one');
  const buns = props.dataIngredients.filter((item) => item.type === 'bun');
  const mains = props.dataIngredients.filter((item) => item.type === 'main');
  const sauces = props.dataIngredients.filter((item) => item.type === 'sauce');

  return (
    <section>
      <h1 className={BurgerIngredientsStyles.title}>Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <a className={BurgerIngredientsStyles.link} href="#buns">
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a className={BurgerIngredientsStyles.link} href="#sauce">
          <Tab value="two" active={current === 'two'} onClick={setCurrent} href="#sauce">
            Соусы
          </Tab>
        </a>
        <a className={BurgerIngredientsStyles.link} href="#main">
          <Tab value="three" active={current === 'three'} onClick={setCurrent} href="#main">
            Начинки
          </Tab>
        </a>
      </div>
      <div className={BurgerIngredientsStyles.ingredients}>
        <h2 className={BurgerIngredientsStyles.typetext} id="buns">
          Булки
        </h2>
        <RenderIngredient arr={buns} />
        <h2 className={BurgerIngredientsStyles.typetext} id="sauce">
          Соусы
        </h2>
        <RenderIngredient arr={mains} />
        <h2 className={BurgerIngredientsStyles.typetext} id="main">
          Начинки
        </h2>
        <RenderIngredient arr={sauces} />
      </div>
    </section>
  );
};
BurgerIngredients.propTypes = {
  dataIngredients: PropTypes.array,
};
export default BurgerIngredients;
