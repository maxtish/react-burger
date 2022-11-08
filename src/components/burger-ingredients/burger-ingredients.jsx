import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter, Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import dataIngredient from '../../utils/data-Ingredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import modalStyles from '../modal/modal.module.css';
import objectWithShape from '../../utils/shape';
import DataIngredientsContext from '../../utils/appContext';
import SelectedIngredientsContext from '../../utils/selContext';
import { useDispatch, useSelector } from 'react-redux';
import { GET_INGREDIENTS } from '../../services/actions/constructor';
import {
  VIEWING_INGREDIENT_ENABLED,
  VIEWING_INGREDIENT_DISABLED,
  POSITION_SCROLL,
} from '../../services/actions/ingredients';

const RenderIngredient = ({ arr, clickProp, clickSelect }) => {
  return (
    <ul className={`${BurgerIngredientsStyles.list} ml-4 mt-6 mb-10`}>
      {arr.map((item) => (
        <li className={BurgerIngredientsStyles.item} key={item._id} id={item._id} onClick={clickProp}>
          {item.__v > 0 && <Counter count={item.__v} size="default" />}

          <img src={item.image} alt={item.name} onClick={clickSelect} />
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

const BurgerIngredients = () => {
  //const ingredients = React.useContext(DataIngredientsContext);
  const ingredients = useSelector((store) => store.ingredients.data); // уже из стора
  const { visibleModal, positionScroll } = useSelector((store) => store.ingredients); // состояние модального окна

  const dispatch = useDispatch();

  const { setSelectedIngredients } = React.useContext(SelectedIngredientsContext);

  //const [current, setCurrent] = React.useState('one');

  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  const [state, setState] = React.useState({
    visible: false,
    igredient: {},
  });
  function SelectClick(event) {
    event.stopPropagation();

    dispatchN(event);
  }

  function reducer(selectedState, event) {
    const ids = event.target.offsetParent.getAttribute('id');
    const selected = ingredients.find((item) => item._id === ids);

    let bun = selectedState.filter((item) => item.type === 'bun');
    // если клик по булке и в массиве есть уже булка
    // тогда удаляем старую булку и добавляем новую
    if ((selected.type === 'bun') & (bun.length > 0)) {
      const indexBun = selectedState.findIndex((item) => item.type === 'bun');
      selectedState.splice(indexBun, 1);
      return [...selectedState, selected];
    } else {
      return [...selectedState, selected];
    }
  }

  const [selectedState, dispatchN] = React.useReducer(reducer, []);

  React.useEffect(() => {
    setSelectedIngredients(selectedState);
    /// передаем в стор список всех ингредиентов в текущем конструкторе бургера
    dispatch({
      type: GET_INGREDIENTS,
      ing: selectedState,
    });
    ////
  }, [selectedState, setSelectedIngredients]);

  function openModal(Event) {
    const targetIndex = Event.currentTarget.id;
    const target = ingredients.find((item) => item._id === targetIndex);
    setState({ ...state, visible: true, igredient: target });
    /// передаем в стор объект текущего просматриваемого ингредиента,
    dispatch({
      type: VIEWING_INGREDIENT_ENABLED,
      ing: target,
    });
  }

  function closeModal() {
    setState({ visible: false, igredient: {} });
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

  //////

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
          <RenderIngredient arr={buns} clickProp={openModal} clickSelect={SelectClick} />
          <h2 className="text text_type_main-medium mb-6" id="sauce">
            Соусы
          </h2>
          <RenderIngredient arr={mains} clickProp={openModal} clickSelect={SelectClick} />
          <h2 className="text text_type_main-medium mb-6" id="main">
            Начинки
          </h2>
          <RenderIngredient arr={sauces} clickProp={openModal} clickSelect={SelectClick} />
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

export default BurgerIngredients;
