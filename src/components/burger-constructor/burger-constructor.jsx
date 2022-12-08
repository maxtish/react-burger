import React from 'react';
import PropTypes from 'prop-types';
import { useRef, useCallback } from 'react';
import BurgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import objectWithShape from '../../utils/shape';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import {
  getOrder,
  VIEWING_ORDER_ENABLED,
  VIEWING_ORDER_DISABLED,
  DELETE_ING,
  ADD_SELECTED_ING,
  TOGGLE_ING,
} from '../../services/actions/constructor';

// Берем все активные, убираем булки и рендерим разметку которые внутри бургера
const RenderBurgerIngr = ({ item, index }) => {
  const dispatch = useDispatch();
  const deleteIng = useCallback(() => {
    dispatch({
      type: DELETE_ING,
      index: item._id,
      indexN: index,
    });
  }, [dispatch, index]);

  const ref = useRef();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'main',
    item: { index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));
  const [{ isHover }, drop] = useDrop({
    accept: 'main',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      //Меняем местами элементы в массиве
      dispatch({
        type: TOGGLE_ING,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });

      item.index = hoverIndex;
    },
    collect: (monitor) => {
      return {
        isHover: monitor.isOver(),
      };
    },
  });

  drag(drop(ref));

  return (
    <li className={`${BurgerConstructorStyles.item} mt-4`} key={index} ref={ref}>
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
  const { selectedIngredients, visibleOrderModal } = useSelector((store) => store.constructors);

  const dispatch = useDispatch();

  // react-dnd
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop: ({ currentItem }) => {
      dispatch({
        type: ADD_SELECTED_ING,
        item: { ...currentItem },
      });
    },
  });

  if (!selectedIngredients.length) {
    return (
      <section ref={dropTarget}>
        <p>Лучше начать с булки</p>
      </section>
    );
  } else {
    const buns = selectedIngredients.filter((item) => item.type === 'bun')[0];

    function openModal() {
      const idArrSelected = selectedIngredients.map((item) => item._id);
      dispatch({
        type: VIEWING_ORDER_ENABLED,
      });
      dispatch(getOrder(idArrSelected));
    }

    function closeModal() {
      dispatch({
        type: VIEWING_ORDER_DISABLED,
      });
    }

    const nobuns = selectedIngredients.filter((item) => item.type !== 'bun');

    return (
      <section>
        <div className={`${BurgerConstructorStyles.wrap}  pt-25 ml-10 pl-4 pr-4`} ref={dropTarget}>
          {!buns && 'Выберите булку'}
          {buns && <RenderBurgerBuns bunsActiv={buns} position="top" />}

          <div className={BurgerConstructorStyles.scroll}>
            {nobuns.map((item, index) => (
              <RenderBurgerIngr item={item} index={index} key={index} />
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
