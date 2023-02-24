import React from 'react';
import PropTypes from 'prop-types';
import { useRef, useCallback } from 'react';
import { useDrop, useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import BurgerConstructorStyles from './burger-constructor.module.css';
import { CurrencyIcon, DragIcon, ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import objectWithShape from '../../utils/shape';
import { addToConstructor, DELETE_ING, TOGGLE_ING } from '../../services/actions/constructor';
import { getOrder, VIEWING_ORDER_ENABLED, VIEWING_ORDER_DISABLED } from '../../services/actions/order';

// Берем все активные, убираем булки и рендерим разметку которые внутри бургера
const RenderBurgerIngr = ({ ingrdient, index }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const deleteIng = useCallback(() => {
    dispatch({
      type: DELETE_ING,
      index: ingrdient._id,
      indexN: index,
    });
  }, [dispatch, index]);

  const [{ handlerID }, drop] = useDrop({
    accept: 'main',
    collect(monitor) {
      return { handlerID: monitor.getHandlerId() };
    },
    hover(item, monitor) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch({
        type: TOGGLE_ING,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      });

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'main',
    item: () => {
      return { ingrdient, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <li
      className={`${BurgerConstructorStyles.item} mt-4`}
      data-handler-id={handlerID}
      draggable={true}
      key={index}
      ref={ref}
      style={{ opacity }}
    >
      <DragIcon type="primary" />{' '}
      <ConstructorElement
        handleClose={deleteIng}
        text={ingrdient.name}
        price={ingrdient.price}
        thumbnail={ingrdient.image}
      />
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
  const buns = selectedBun?.price;
  let summ = 0;
  if (buns > 0) {
    summ += buns * 2;
  }

  selectedIngredients.map((item) => {
    summ += item.price;
  });

  return <p className="text text_type_digits-medium">{summ}</p>;
};

const BurgerConstructor = () => {
  const { selectedIngredients, selectedBun } = useSelector((store) => store.constructors);
  const visibleOrderModal = useSelector((store) => store.order.visibleOrderModal);
  const isAuth = useSelector((store) => store.user.isAuth);
  const dispatch = useDispatch();

  // react-dnd
  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop: ({ currentItem }) => {
      dispatch(addToConstructor(currentItem));
    },
  });
  const navigation = useNavigate();
  const location = useLocation();
  function openModal() {
    if (isAuth) {
      let idArrSelected = selectedIngredients.map((item) => item._id);
      idArrSelected.push(selectedBun._id);
      idArrSelected.push(selectedBun._id);

      dispatch({
        type: VIEWING_ORDER_ENABLED,
      });
      dispatch(getOrder(idArrSelected));
    } else {
      navigation('/login', { state: { from: location } });
    }
  }

  function closeModal() {
    dispatch({
      type: VIEWING_ORDER_DISABLED,
    });
  }

  return (
    <section className={BurgerConstructorStyles.section} ref={dropTarget}>
      <div className={`${BurgerConstructorStyles.wrap}  pt-25 ml-10 pl-4 pr-4`}>
        {!selectedBun && ''}
        {selectedBun && <RenderBurgerBuns bunsActiv={selectedBun} position="top" />}

        <div className={BurgerConstructorStyles.scroll}>
          {selectedIngredients.map((item, index) => (
            <RenderBurgerIngr ingrdient={item} index={index} key={item.id} />
          ))}
        </div>
        {!selectedBun && ''}
        {selectedBun && <RenderBurgerBuns bunsActiv={selectedBun} position="bottom" />}
      </div>
      {!selectedBun && (
        <div className={`${BurgerConstructorStyles.summing} mt-10 mr-4`}>
          <SummPrice selectedIngredients={selectedIngredients} selectedBun={selectedBun} />

          <div className={`${BurgerConstructorStyles.icon} ml-2 mr-10`}>
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" disabled={true} onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      )}

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
