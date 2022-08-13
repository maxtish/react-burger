import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorStyles from './burgerconstructor.module.css';
import {
  CurrencyIcon,
  DragIcon,
  Counter,
  Typography,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
// Берем все активные, убираем булки и рендерим разметку которые внутри бургера
const RenderBurgerIngr = ({ arr }) => {
  const nobuns = arr.filter((item) => item.type !== 'bun');

  return (
    <>
      {nobuns.map((item) => (
        <li className={BurgerConstructorStyles.item} key={item._id}>
          <DragIcon type="primary" /> <ConstructorElement text={item.name} price={50} thumbnail={item.image} />
        </li>
      ))}
    </>
  );
};

// Берем активную булку и позицию её, рендерим разметку булок вверх и низ
const RenderBurgerBuns = ({ bunsActiv, position }) => {
  return (
    <div className={BurgerConstructorStyles.buns}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text={`${bunsActiv.name} (${position})`}
        price={200}
        thumbnail={bunsActiv.image}
      />
    </div>
  );
};

const SummPrice = ({ arr }) => {
  let summ = 0;
  arr.map((item) => {
    summ = +(item.price * item.__v);
  });
  return <p className="text text_type_digits-medium">{summ}</p>;
};

const BurgerConstructor = (props) => {
  const filterDataIngredients = props.dataIngredients.filter((item) => item.__v > 0);
  const buns = filterDataIngredients.filter((item) => item.type === 'bun');
  const mains = filterDataIngredients.filter((item) => item.type === 'main');
  const sauces = filterDataIngredients.filter((item) => item.type === 'sauce');
  const bunsActiv = buns[0];

  return (
    <div
      className={BurgerConstructorStyles.constructor}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
    >
      <RenderBurgerBuns bunsActiv={bunsActiv} position="Верх" />

      <div className={BurgerConstructorStyles.scroll}>
        <RenderBurgerIngr arr={filterDataIngredients} />
      </div>

      <RenderBurgerBuns bunsActiv={bunsActiv} position="Низ" />
      <div className={BurgerConstructorStyles.summing}>
        <SummPrice arr={filterDataIngredients} />
        <CurrencyIcon type="primary" />
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  dataIngredients: PropTypes.array,
};
export default BurgerConstructor;
