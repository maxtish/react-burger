import React from 'react';
import BurgerConstructorStyles from './burgerconstructor.module.css';
import {
  CurrencyIcon,
  Counter,
  Typography,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = (props) => {
  const filterDataIngredients = props.dataIngredients.filter((item) => item.__v > 0);
  const buns = filterDataIngredients.filter((item) => item.type === 'bun');
  const mains = filterDataIngredients.filter((item) => item.type === 'main');
  const sauces = filterDataIngredients.filter((item) => item.type === 'sauce');
  const bunsActiv = buns[0];
  console.log(buns);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bunsActiv.name} (верх)`}
        price={200}
        thumbnail={bunsActiv.image}
      />
      <div className={BurgerConstructorStyles.scroll}>
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
        <ConstructorElement text={mains[0].name} price={50} thumbnail={mains[0].image} />
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text={`${bunsActiv.name} (Низ)`}
        price={200}
        thumbnail={bunsActiv.image}
      />
    </div>
  );
};
export default BurgerConstructor;
