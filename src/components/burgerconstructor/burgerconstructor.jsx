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
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={mains}
      />
      <ConstructorElement text="Краторная булка N-200i (верх)" price={50} thumbnail={mains} />
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={mains}
      />
    </div>
  );
};
export default BurgerConstructor;
