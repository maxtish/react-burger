import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import objectWithShape from '../../utils/shape';
import { useDispatch, useSelector } from 'react-redux';
import { GET_INGREDIENTS } from '../../services/actions/constructor';
import {
  VIEWING_INGREDIENT_ENABLED,
  VIEWING_INGREDIENT_DISABLED,
  POSITION_SCROLL,
} from '../../services/actions/ingredients';
import { useDrag } from 'react-dnd';

// render игридиента
const RenderIngredient = ({ item, clickProp, clickSelect, counters }) => {
  // react-dnd
  const currentItem = item;
  const [, dragRef] = useDrag({
    type: 'ingredients',
    item: { currentItem },
  });

  return (
    <li className={BurgerIngredientsStyles.item} key={item._id} id={item._id} onClick={clickProp} ref={dragRef}>
      {counters[item._id] > 0 && <Counter count={counters[item._id]} size="default" />}

      <img src={item.image} alt={item.name} onClick={clickSelect} />
      <div className={`${BurgerIngredientsStyles.price} mt-1 mb-1`}>
        <p className={`${BurgerIngredientsStyles.pricenumb} text text_type_digits-default`}>{item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${BurgerIngredientsStyles.text} text text_type_main-default pb-6`}>{item.name}</p>
    </li>
  );
};

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

const BurgerIngredients = () => {
  const ingredients = useSelector((store) => store.ingredients.data); // уже из стора
  const { visibleModal, positionScroll } = useSelector((store) => store.ingredients); // состояние модального окна

  const dispatch = useDispatch();

  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  function SelectClick(event) {
    event.stopPropagation();

    const ids = event.target.offsetParent.getAttribute('id');
    const selected = ingredients.find((item) => item._id === ids);

    dispatch({
      type: GET_INGREDIENTS,
      ing: selected,
    });
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

  //////couters
  const selectedIngredients = useSelector((store) => store.constructors.selectedIngredients);
  const counters = useMemo(
    () =>
      selectedIngredients.reduce((previousValue, item) => {
        if (!previousValue[item._id]) {
          if (item.type === 'bun') {
            previousValue[item._id] = 2;
          } else {
            previousValue[item._id] = 1;
          }
        } else {
          previousValue[item._id]++;
        }
        return previousValue;
      }, {}),
    [selectedIngredients]
  );

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
