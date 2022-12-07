import React from 'react';
import PropTypes from 'prop-types';
import { useRef, useCallback } from 'react';
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

import { useDrop } from 'react-dnd';
import uniqid from 'uniqid';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
  getOrder,
  VIEWING_ORDER_ENABLED,
  VIEWING_ORDER_DISABLED,
  GET_INGREDIENTS,
  DELETE_ING,
  ADD_SELECTED_ING,
} from '../../services/actions/constructor';
import { GET_ING } from '../../services/actions/ingredients';

// Берем все активные, убираем булки и рендерим разметку которые внутри бургера
const RenderBurgerIngr = ({ item }) => {
  const dispatch = useDispatch();
  const deleteIng = () => {
    dispatch({
      type: DELETE_ING,
      index: item._id,
    });
  };

  return (
    <li className={`${BurgerConstructorStyles.item} mt-4`} key={item._id}>
      <DragIcon type="primary" />{' '}
      <ConstructorElement handleClose={deleteIng} text={item.name} price={item.price} thumbnail={item.image} />
    </li>
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
  //const { selectedIngredients } = React.useContext(SelectedIngredientsContext);
  const { selectedIngredients, visibleOrderModal } = useSelector((store) => store.constructors);

  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    visible: false,
    id: '',
  });

  // react-dnd
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'items',
    drop: ({ currentItem }) => {
      console.log(currentItem);
      dispatch({
        type: ADD_SELECTED_ING,
        item: { currentItem },
      });
    },
  });

  if (!selectedIngredients.length) {
    return (
      <section>
        <p>Лучше начать с булки</p>
      </section>
    );
  } else {
    const buns = selectedIngredients.filter((item) => item.type === 'bun')[0];
    const mains = selectedIngredients.filter((item) => item.type === 'main');
    const sauces = selectedIngredients.filter((item) => item.type === 'sauce');

    function openModal() {
      const idArrSelected = selectedIngredients.map((item) => item._id);
      dispatch({
        type: VIEWING_ORDER_ENABLED,
      });
      dispatch(getOrder(idArrSelected));

      /*
      getOrderDetails(idArrSelected)
        .then((res) => {
          setState({ ...state, visible: true, id: res.order.number });
        })
        .catch((error) => {
          console.log('error:', error);
          setState({ ...state, visible: false });
        });*/
    }

    function closeModal() {
      //setState({ ...state, visible: false, id: '' });
      dispatch({
        type: VIEWING_ORDER_DISABLED,
      });
    }

    const nobuns = selectedIngredients.filter((item) => item.type !== 'bun');

    return (
      <section ref={dropTarget}>
        <div className={`${BurgerConstructorStyles.wrap}  pt-25 ml-10 pl-4 pr-4`}>
          {!buns && 'Выберите булку'}
          {buns && <RenderBurgerBuns bunsActiv={buns} position="top" />}

          <div className={BurgerConstructorStyles.scroll}>
            {nobuns.map((item) => (
              <RenderBurgerIngr item={item} />
            ))}
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
        {visibleOrderModal && (
          <Modal header="" onClose={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </section>
    );
  }
};

RenderBurgerBuns.propTypes = {
  bunsActiv: objectWithShape.isRequired,
  position: PropTypes.string.isRequired,
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
