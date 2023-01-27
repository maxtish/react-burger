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
  addToConstructor,
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

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'main',
    item: { item, index },
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
      const dragIndex = item;
      const hoverIndex = index;
      console.log('dragIndex-', dragIndex, 'над ним-', hoverIndex);

      if (dragIndex === hoverIndex) {
        return;
      }

      //Меняем местами элементы в массиве
      dispatch({
        type: TOGGLE_ING,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });
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

const SummPrice = ({ selectedIngredients, selectedBun }) => {
  const buns = selectedBun.price;
  let summ = 0;
  summ = buns * 2;
  selectedIngredients.map((item) => {
    summ += item.price;
  });
  return <p className="text text_type_digits-medium">{summ}</p>;
};

const BurgerConstructor = () => {
  const { selectedIngredients, visibleOrderModal, selectedBun } = useSelector((store) => store.constructors);

  const dispatch = useDispatch();

  // react-dnd
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop: ({ currentItem }) => {
      dispatch(addToConstructor(currentItem));
    },
  });

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

  return (
    <section>
      <div className={`${BurgerConstructorStyles.wrap}  pt-25 ml-10 pl-4 pr-4`} ref={dropTarget}>
        {!selectedBun && ''}
        {selectedBun && <RenderBurgerBuns bunsActiv={selectedBun} position="top" />}

        <div className={BurgerConstructorStyles.scroll}>
          {selectedIngredients.map((item, index) => (
            <RenderBurgerIngr item={item} index={index} key={item.id} />
          ))}
        </div>
        {!selectedBun && ''}
        {selectedBun && <RenderBurgerBuns bunsActiv={selectedBun} position="bottom" />}
      </div>
      {!selectedBun && ''}
      {selectedBun && (
        <div className={`${BurgerConstructorStyles.summing} mt-10 mr-4`}>
          <SummPrice selectedIngredients={selectedIngredients} selectedBun={selectedBun} />

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
};

RenderBurgerBuns.propTypes = {
  bunsActiv: objectWithShape.isRequired,
  position: PropTypes.string.isRequired,
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default BurgerConstructor;
