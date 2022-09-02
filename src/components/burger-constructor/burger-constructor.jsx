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
  const buns = arr.filter((item) => item.type === 'bun')[0].price;

  let summ = 0;
  summ = buns * 2;
  arr.map((item) => {
    summ += item.price;
  });
  return <p className="text text_type_digits-medium">{summ}</p>;
};

const BurgerConstructor = () => {
  const { selectedIngredients } = React.useContext(SelectedIngredientsContext);

  const [state, setState] = React.useState({
    visible: false,
    id: '',
  });
  console.log('constructor', selectedIngredients);
  if (!selectedIngredients.length) {
    console.log('Ошибка - нет массива');

    return <section>Нет выбранных элементов</section>;
  } else {
    const buns = selectedIngredients.filter((item) => item.type === 'bun')[0];

    const mains = selectedIngredients.filter((item) => item.type === 'main');
    const sauces = selectedIngredients.filter((item) => item.type === 'sauce');

    function openModal() {
      setState({ ...state, visible: true, id: 777 });
    }

    function closeModal() {
      setState({ ...state, visible: false, id: '' });
    }

    return (
      <section>
        <div className={`${BurgerConstructorStyles.wrap} pt-25 ml-10 pl-4 pr-4`}>
          {!buns && 'Булки нет'}
          {buns && <RenderBurgerBuns bunsActiv={buns} position="top" />}

          <div className={BurgerConstructorStyles.scroll}>
            <RenderBurgerIngr arr={selectedIngredients} />
          </div>
          {!buns && 'Булки нет'}
          {buns && <RenderBurgerBuns bunsActiv={buns} position="bottom" />}
        </div>
        <div className={`${BurgerConstructorStyles.summing} mt-10 mr-4`}>
          {!buns && 'Булки нет'}
          {buns && <SummPrice arr={selectedIngredients} />}

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
  }
};
BurgerConstructor.propTypes = {
  dataIngredients: PropTypes.arrayOf(objectWithShape.isRequired),
};

RenderBurgerBuns.propTypes = {
  bunsActiv: objectWithShape.isRequired,
  position: PropTypes.string.isRequired,
};
export default BurgerConstructor;
