import React, { useMemo, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { POSITION_SCROLL } from '../../services/actions/ingredients';
import { VIEWING_INGREDIENT_DISABLED } from '../../services/actions/ingredient-detail-modal';
import { useDrag } from 'react-dnd';
import { IIngredientsGroupProps, IIngredientProps, IIngredient } from '../../services/types/data';

// render группы игридиенто в
const RenderGroup: FC<IIngredientsGroupProps> = ({ arr, counters }) => {
  return (
    <ul className={`${BurgerIngredientsStyles.list} ml-4 mt-6 mb-10`}>
      {arr.map((item, index) => (
        <RenderIngredient key={index} counters={counters} item={item} />
      ))}
    </ul>
  );
};

// render игридиента
const RenderIngredient: FC<IIngredientProps> = ({ item, counters }) => {
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
        {typeof counters[item._id] !== 'undefined' && <Counter count={counters[item._id]!} size="default" />}

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

  const buns = ingredients.filter((item: IIngredient) => item.type === 'bun');
  const mains = ingredients.filter((item: IIngredient) => item.type === 'main');
  const sauces = ingredients.filter((item: IIngredient) => item.type === 'sauce');

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
    let sectionScroll = document.getElementById('sectionScroll') as HTMLDivElement | null;
    let sectionSauce = document.getElementById('sauce') as HTMLDivElement | null;
    let sectionMain = document.getElementById('main') as HTMLDivElement | null;

    if (sectionScroll !== null) {
      sectionScroll.addEventListener('scroll', function () {
        if (sectionScroll && sectionSauce && sectionMain) {
          let korrektor: number = Math.round(sectionScroll.getBoundingClientRect().top);
          let sauceTop: number = Math.round(sectionSauce.getBoundingClientRect().top - korrektor);
          let mainTop: number = Math.round(sectionMain.getBoundingClientRect().top - korrektor);
          let windowHight: number = Math.round(sectionScroll.getBoundingClientRect().height) / 5;

          if (sauceTop < windowHight) {
            dispatch({
              type: POSITION_SCROLL,
              positionScroll: 'sauce',
            });

            if (mainTop < windowHight) {
              dispatch({
                type: POSITION_SCROLL,
                positionScroll: 'main',
              });
            }
          } else {
            dispatch({
              type: POSITION_SCROLL,
              positionScroll: 'buns',
            });
          }
        }
      });
    }
  };
  React.useEffect(() => {
    activePositionScroll();
  }, []);

  //Скролл ингредиентов при клике на таб
  const onTabClick = (event: string) => {
    dispatch({
      type: POSITION_SCROLL,
      positionScroll: event,
    });
    const element = document.getElementById(event);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  //////Счетчики на ингридиентах
  const { selectedIngredients, selectedBun } = useSelector((store) => store.constructors);

  const counters = useMemo(() => {
    const count: { [key: string]: number | undefined } = {};
    selectedIngredients.forEach((ingredient) => {
      if (!count[ingredient._id]) count[ingredient._id] = 0;
      count[ingredient._id]!++;
    });
    if (selectedBun) count[selectedBun._id] = 2;
    return count;
  }, [selectedIngredients, selectedBun]);

  return (
    <>
      <section>
        <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
        <div className={BurgerIngredientsStyles.wrap}>
          <Tab value="buns" active={positionScroll === 'buns'} onClick={onTabClick}>
            Булки
          </Tab>

          <Tab value="sauce" active={positionScroll === 'sauce'} onClick={onTabClick}>
            Соусы
          </Tab>

          <Tab value="main" active={positionScroll === 'main'} onClick={onTabClick}>
            Начинки
          </Tab>
        </div>
        <div className={BurgerIngredientsStyles.ingredients} id="sectionScroll">
          <h2 className="text text_type_main-medium mb-6 mt-10" id="buns">
            Булки
          </h2>
          <RenderGroup counters={counters} arr={buns} />
          <h2 className="text text_type_main-medium mb-6" id="sauce">
            Соусы
          </h2>
          <RenderGroup counters={counters} arr={mains} />
          <h2 className="text text_type_main-medium mb-6" id="main">
            Начинки
          </h2>
          <RenderGroup counters={counters} arr={sauces} />
        </div>
      </section>

      {visibleModal && (
        <Modal onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

export default React.memo(BurgerIngredients);
