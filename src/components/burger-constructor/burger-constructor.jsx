import React from 'react';
import PropTypes from 'prop-types';
import BurgerConstructorStyles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  DragIcon,
  Counter,
  Typography,
  ConstructorElement,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import objectWithShape from '../../utils/shape';

// Берем все активные, убираем булки и рендерим разметку которые внутри бургера
const RenderBurgerIngr = ({ arr }) => {
  const nobuns = arr.filter((item) => item.type !== 'bun');

  return (
    <>
      {nobuns.map((item) => (
        <li className={`${BurgerConstructorStyles.item} mt-4`} key={item._id}>
          <DragIcon type="primary" /> <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
        </li>
      ))}
    </>
  );
};

// Берем активную булку и позицию её, рендерим разметку булок вверх и низ
const RenderBurgerBuns = ({ bunsActiv, position }) => {
  const positionRus = position === 'top' ? 'Верх' : 'Низ';
  return (
    <div className="ml-8 mr-4">
      <ConstructorElement
        type={position}
        isLocked={true}
        text={`${bunsActiv.name} (${positionRus})`}
        price={bunsActiv.price}
        thumbnail={bunsActiv.image}
      />
    </div>
  );
};

const SummPrice = ({ arr }) => {
  const buns = arr.filter((item) => item.type === 'bun');
  const nobuns = arr.filter((item) => item.type !== 'bun');
  let summ = 0;
  summ = buns[0].price * 2;
  nobuns.map((item) => {
    summ += item.price;
  });
  return <p className="text text_type_digits-medium">{summ}</p>;
};

const BurgerConstructor = ({ dataIngredients }) => {
  const filterDataIngredients = dataIngredients.filter((item) => item.__v > 0);
  const buns = filterDataIngredients.filter((item) => item.type === 'bun');
  const mains = filterDataIngredients.filter((item) => item.type === 'main');
  const sauces = filterDataIngredients.filter((item) => item.type === 'sauce');
  const bunsActiv = buns[0];

  const [state, setState] = React.useState({
    visible: false,
    id: '',
  });

  function openModal() {
    setState({ ...state, visible: true, id: 777 });
  }

  function closeModal() {
    setState({ ...state, visible: false, id: '' });
  }

  return (
    <section>
      <div className={`${BurgerConstructorStyles.wrap} pt-25 ml-10 pl-4 pr-4`}>
        <RenderBurgerBuns bunsActiv={bunsActiv} position="top" />

        <div className={BurgerConstructorStyles.scroll}>
          <RenderBurgerIngr arr={filterDataIngredients} />
        </div>

        <RenderBurgerBuns bunsActiv={bunsActiv} position="bottom" />
      </div>
      <div className={`${BurgerConstructorStyles.summing} mt-10 mr-4`}>
        <SummPrice arr={filterDataIngredients} />

        <div className={`${BurgerConstructorStyles.icon} ml-2 mr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
      {state.visible && (
        <Modal header="" onClose={closeModal}>
          <OrderDetails id={state.id} />
        </Modal>
      )}
    </section>
  );
};

BurgerConstructor.propTypes = {
  dataIngredients: PropTypes.arrayOf(objectWithShape.isRequired),
};

RenderBurgerBuns.propTypes = {
  bunsActiv: objectWithShape.isRequired,
  position: PropTypes.string.isRequired,
};
export default BurgerConstructor;
