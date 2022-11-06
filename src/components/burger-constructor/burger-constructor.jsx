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
import DataIngredientsContext from '../../utils/appContext';
import SelectedIngredientsContext from '../../utils/selContext';
import { getOrderDetails } from '../../utils/api';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ADD_ING, GET_ING } from '../../services/actions/constructor';

// Берем все активные, убираем булки и рендерим разметку которые внутри бургера
const RenderBurgerIngr = ({ arr }) => {
  const nobuns = arr.filter((item) => item.type !== 'bun');

  return (
    <>
      {nobuns.map((item, index) => (
        <li className={`${BurgerConstructorStyles.item} mt-4`} key={index}>
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
  const buns = arr.filter((item) => item.type === 'bun')[0].price;
  let summ = 0;
  summ = buns;
  arr.map((item) => {
    summ += item.price;
  });
  return <p className="text text_type_digits-medium">{summ}</p>;
};

const BurgerConstructor = () => {
  //тест сторе
  let st = useSelector((store) => store.ingredients.ing);
  let stn = useSelector((store) => store.constructors.number);
  const dispatch = useDispatch();
  const switchTabKon = () => {
    dispatch({ type: GET_ING });

    console.log(st);
  };
  const switchTabIng = () => {
    dispatch({ type: ADD_ING });

    console.log(stn);
  };

  //тест сторе

  const { selectedIngredients } = React.useContext(SelectedIngredientsContext);

  const [state, setState] = React.useState({
    visible: false,
    id: '',
  });

  if (!selectedIngredients.length) {
    return (
      <section>
        <Button type="primary" size="large" onClick={switchTabIng}>
          + ингридиент
        </Button>
        <Button type="primary" size="large" onClick={switchTabKon}>
          + конструктор
        </Button>
        <p>Лучше начать с булки</p>
      </section>
    );
  } else {
    const buns = selectedIngredients.filter((item) => item.type === 'bun')[0];

    const mains = selectedIngredients.filter((item) => item.type === 'main');
    const sauces = selectedIngredients.filter((item) => item.type === 'sauce');

    function openModal() {
      const idArrSelected = selectedIngredients.map((item) => item._id);

      getOrderDetails(idArrSelected)
        .then((res) => {
          setState({ ...state, visible: true, id: res.order.number });
        })
        .catch((error) => {
          console.log('error:', error);
          setState({ ...state, visible: false });
        });
    }

    function closeModal() {
      setState({ ...state, visible: false, id: '' });
    }

    return (
      <section>
        <div className={`${BurgerConstructorStyles.wrap} pt-25 ml-10 pl-4 pr-4`}>
          {!buns && 'Выберите булку'}
          {buns && <RenderBurgerBuns bunsActiv={buns} position="top" />}

          <div className={BurgerConstructorStyles.scroll}>
            <RenderBurgerIngr arr={selectedIngredients} />
          </div>
          {!buns && 'Выберите булку'}
          {buns && <RenderBurgerBuns bunsActiv={buns} position="bottom" />}
        </div>
        {!buns && 'Это не бургер!'}
        {buns && (
          <div className={`${BurgerConstructorStyles.summing} mt-10 mr-4`}>
            <SummPrice arr={selectedIngredients} />

            <div className={`${BurgerConstructorStyles.icon} ml-2 mr-10`}>
              <CurrencyIcon type="primary" />
            </div>
            <Button type="primary" size="large" onClick={openModal}>
              Оформить заказ
            </Button>
          </div>
        )}
        {state.visible && (
          <Modal header="" onClose={closeModal}>
            <OrderDetails id={state.id} />
          </Modal>
        )}
      </section>
    );
  }
};
BurgerConstructor.propTypes = {
  selectedIngredients: PropTypes.arrayOf(objectWithShape.isRequired),
};

RenderBurgerBuns.propTypes = {
  bunsActiv: objectWithShape.isRequired,
  position: PropTypes.string.isRequired,
};

export default BurgerConstructor;
