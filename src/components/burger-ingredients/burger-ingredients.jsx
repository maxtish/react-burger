import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import objectWithShape from '../../utils/shape';
import { useDispatch, useSelector } from 'react-redux';
import { addToConstructor } from '../../services/actions/constructor';

import { POSITION_SCROLL } from '../../services/actions/ingredients';
import {
  VIEWING_INGREDIENT_ENABLED,
  VIEWING_INGREDIENT_DISABLED,
} from '../../services/actions/ingredient-detail-modal';

import { useDrag } from 'react-dnd';

// render группы игридиенто в
const RenderGroup = ({ arr, clickProp, clickSelect, counters }) => {
  return (
    <ul className={`${BurgerIngredientsStyles.list} ml-4 mt-6 mb-10`}>
      {arr.map((item, index) => (
        <RenderIngredient key={index} counters={counters} clickProp={clickProp} clickSelect={clickSelect} item={item} />
      ))}
    </ul>
  );
};

// render игридиента
const RenderIngredient = ({ item, clickProp, counters }) => {
  const ingredients = useSelector((store) => store.ingredients.data); // уже из стора
  // react-dnd
  const currentItem = item;
  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: { currentItem },
  });
  const location = useLocation();
  return (
    <li className={BurgerIngredientsStyles.item} key={item._id} id={item._id} ref={dragRef}>
      <Link
        className={BurgerIngredientsStyles.link}
        to={`/ingredients/${item._id}`}
        state={{ background: location, ingredient: item }}
      >
        {counters[item._id] > 0 && <Counter count={counters[item._id]} size="default" />}

        <img src={item.image} alt={item.name} />
        <div className={`${BurgerIngredientsStyles.price} mt-1 mb-1`}>
          <p className={`${BurgerIngredientsStyles.pricenumb} text text_type_digits-default`}>{item.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${BurgerIngredientsStyles.text} text text_type_main-default pb-6`}>{item.name}</p>
      </Link>
    </li>
  );
};

const BurgerIngredients = () => {
  const ingredients = useSelector((store) => store.ingredients.data); // уже из стора
  const { positionScroll } = useSelector((store) => store.ingredients); // состояние модального окна
  const visibleModal = useSelector((store) => store.ingredientDetailModal.visibleModal);
  const dispatch = useDispatch();

  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  function SelectClick(event) {
    event.stopPropagation();

    const ids = event.target.offsetParent.getAttribute('id');
    const selected = ingredients.find((item) => item._id === ids);

    dispatch(addToConstructor(selected));
  }

  function openModal(Event) {
    const targetIndex = Event.currentTarget.id;
    const target = ingredients.find((item) => item._id === targetIndex);

    /// передаем в стор объект текущего просматриваемого ингредиента,
    dispatch({
      type: VIEWING_INGREDIENT_ENABLED,
      ing: target,
    });
  }

  function closeModal() {
    /// удаляем из стора объект текущего просматриваемого ингредиента,
    dispatch({
      type: VIEWING_INGREDIENT_DISABLED,
    });
  }

  //По мере пользовательского скролла ингредиентов в компоненте BurgerIngredients
  //выделяйте активным тот переключатель, заголовок которого в
  //самом контейнере ближе всего к верхней левой границе контейнера компонента BurgerIngredients.
  const activePositionScroll = () => {
    document.getElementById('sectionScroll').addEventListener('scroll', function () {
      let korrektor = Math.round(document.getElementById('sectionScroll').getBoundingClientRect().top);
      let sauceTop = Math.round(document.getElementById('sauce').getBoundingClientRect().top - korrektor);
      let mainTop = Math.round(document.getElementById('main').getBoundingClientRect().top - korrektor);
      let windowHight = Math.round(document.getElementById('sectionScroll').getBoundingClientRect().height) / 5;

      if (sauceTop < windowHight) {
        dispatch({
          type: POSITION_SCROLL,
          positionScroll: 'two',
        });

        if (mainTop < windowHight) {
          dispatch({
            type: POSITION_SCROLL,
            positionScroll: 'three',
          });
        }
      } else {
        dispatch({
          type: POSITION_SCROLL,
          positionScroll: 'one',
        });
      }
    });
  };
  React.useEffect(() => {
    activePositionScroll();
  }, []);

  //////Счетчики на ингридиентах
  const { selectedIngredients, selectedBun } = useSelector((store) => store.constructors);

  const counters = useMemo(() => {
    const count = {};
    selectedIngredients.forEach((ingredient) => {
      if (!count[ingredient._id]) count[ingredient._id] = 0;
      count[ingredient._id]++;
    });
    if (selectedBun) count[selectedBun._id] = 2;
    return count;
  }, [selectedIngredients, selectedBun]);

  return (
    <>
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={BurgerIngredientsStyles.wrap}>
          <a className={BurgerIngredientsStyles.link} href="#buns">
            <Tab value="one" active={positionScroll === 'one'} href="#buns">
              Булки
            </Tab>
          </a>
          <a className={BurgerIngredientsStyles.link} href="#sauce">
            <Tab value="two" active={positionScroll === 'two'} href="#sauce">
              Соусы
            </Tab>
          </a>
          <a className={BurgerIngredientsStyles.link} href="#main">
            <Tab value="three" active={positionScroll === 'three'} href="#main">
              Начинки
            </Tab>
          </a>
        </div>
        <div className={BurgerIngredientsStyles.ingredients} id="sectionScroll">
          <h2 className="text text_type_main-medium mb-6 mt-10" id="buns">
            Булки
          </h2>
          <RenderGroup counters={counters} arr={buns} clickProp={openModal} clickSelect={SelectClick} />
          <h2 className="text text_type_main-medium mb-6" id="sauce">
            Соусы
          </h2>
          <RenderGroup counters={counters} arr={mains} clickProp={openModal} clickSelect={SelectClick} />
          <h2 className="text text_type_main-medium mb-6" id="main">
            Начинки
          </h2>
          <RenderGroup counters={counters} arr={sauces} clickProp={openModal} clickSelect={SelectClick} />
        </div>
      </section>

      {visibleModal && (
        <Modal header="Детали ингредиента" onClose={closeModal}>
          <IngredientDetails />
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
  clickSelect: PropTypes.func.isRequired,
};

export default React.memo(BurgerIngredients);
