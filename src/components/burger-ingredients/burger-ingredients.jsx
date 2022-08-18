import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import dataIngredient from '../../utils/dataIngredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import modalStyles from '../modal/modal.module.css';
import objectWithShape from '../../utils/shape';

const RenderIngredient = ({ arr, clickProp }) => {
  return (
    <ul className={`${BurgerIngredientsStyles.list} ml-4 mt-6 mb-10`}>
      {arr.map((item) => (
        <li className={BurgerIngredientsStyles.item} key={item._id} id={item._id} onClick={clickProp}>
          {item.__v > 0 && <Counter count={item.__v} size="default" />}

          <img src={item.image} alt={item.name} />
          <div className={`${BurgerIngredientsStyles.price} mt-1 mb-1`}>
            <p className={`${BurgerIngredientsStyles.pricenumb} text text_type_digits-default`}>{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${BurgerIngredientsStyles.text} text text_type_main-default pb-6`}>{item.name}</p>
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
    const targetIndex = Event.currentTarget.id;
    const target = propsArr.dataIngredients.find((item) => item._id === targetIndex);
    setState({ ...state, visible: true, igredient: target });
  }

  function closeModal() {
    setState({ visible: false, igredient: {} });
  }

  return (
    <>
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={BurgerIngredientsStyles.wrap}>
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
          <h2 className="text text_type_main-medium mb-6 mt-10" id="buns">
            Булки
          </h2>
          <RenderIngredient arr={buns} clickProp={openModal} />
          <h2 className="text text_type_main-medium mb-6" id="sauce">
            Соусы
          </h2>
          <RenderIngredient arr={mains} clickProp={openModal} />
          <h2 className="text text_type_main-medium mb-6" id="main">
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
  dataIngredients: PropTypes.arrayOf(objectWithShape.isRequired),
};

RenderIngredient.propTypes = {
  arr: PropTypes.arrayOf(objectWithShape.isRequired),
  clickProp: PropTypes.func.isRequired,
};

export default BurgerIngredients;
