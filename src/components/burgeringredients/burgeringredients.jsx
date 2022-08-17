import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burgeringredients.module.css';
import { Tab, CurrencyIcon, Counter, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import dataIngredient from '../../utils/dataIngredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredientdetails/ingredientdetails';
import modalStyles from '../modal/modal.module.css';

const RenderIngredient = ({ arr, clickProp }) => {
  return (
    <ul className={BurgerIngredientsStyles.list}>
      {arr.map((item) => (
        <li className={BurgerIngredientsStyles.item} key={item._id} id={item._id} onClick={clickProp}>
          {item.__v > 0 && <Counter count={item.__v} size="default" />}

          <img src={item.image} alt={item.name} />
          <div className={BurgerIngredientsStyles.price}>
            <p className={`text text_type_digits-default ${BurgerIngredientsStyles.pricenumb}`}>{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={BurgerIngredientsStyles.text}>{item.name}</p>
        </li>
      ))}
    </ul>
  );
};

const BurgerIngredients = (propsArr) => {
  const [current, setCurrent] = React.useState('one');
  const buns = propsArr.dataIngredients.filter((item) => item.type === 'bun');
  const mains = propsArr.dataIngredients.filter((item) => item.type === 'main');
  const sauces = propsArr.dataIngredients.filter((item) => item.type === 'sauce');

  const [state, setState] = React.useState({
    visible: false,
    igredient: {},
  });

  function openModal(Event) {
    console.log('openModal');
    const targetIndex = Event.currentTarget.id;
    console.log('id клика = ', targetIndex);
    const target = propsArr.dataIngredients.find((item) => item._id === targetIndex);
    console.log('id с массива =', target._id);
    setState({ ...state, visible: true, igredient: target });
    console.log(state);
  }

  function closeModal() {
    console.log('closeModal');
    setState({ visible: false, igredient: {} });
  }

  return (
    <>
      <section>
        <h1 className={BurgerIngredientsStyles.title}>Соберите бургер</h1>
        <div style={{ display: 'flex' }}>
          <a className={BurgerIngredientsStyles.link} href="#buns">
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
          </a>
          <a className={BurgerIngredientsStyles.link} href="#sauce">
            <Tab value="two" active={current === 'two'} onClick={setCurrent} href="#sauce">
              Соусы
            </Tab>
          </a>
          <a className={BurgerIngredientsStyles.link} href="#main">
            <Tab value="three" active={current === 'three'} onClick={setCurrent} href="#main">
              Начинки
            </Tab>
          </a>
        </div>
        <div className={BurgerIngredientsStyles.ingredients}>
          <h2 className={BurgerIngredientsStyles.typetext} id="buns">
            Булки
          </h2>
          <RenderIngredient arr={buns} clickProp={openModal} />
          <h2 className={BurgerIngredientsStyles.typetext} id="sauce">
            Соусы
          </h2>
          <RenderIngredient arr={mains} clickProp={openModal} />
          <h2 className={BurgerIngredientsStyles.typetext} id="main">
            Начинки
          </h2>
          <RenderIngredient arr={sauces} clickProp={openModal} />
        </div>
      </section>

      {state.visible && (
        <Modal header="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails ingredient={state.igredient} />
        </Modal>
      )}
    </>
  );
};
BurgerIngredients.propTypes = {
  dataIngredients: PropTypes.array,
};
export default BurgerIngredients;
