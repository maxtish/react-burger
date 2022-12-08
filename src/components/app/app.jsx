import { React, useEffect, useState } from 'react';
import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import DataIngredientsContext from '../../utils/appContext';
import SelectedIngredientsContext from '../../utils/selContext';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsIng } from '../../services/actions/ingredients';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getItemsIng());
  }, [dispatch]);

  const { hasError, isLoading, data } = useSelector((store) => store.ingredients);

  return (
    <div className={AppStyles.page}>
      <AppHeader />

      {isLoading && 'Загрузка...'}
      {hasError && 'Ошибка'}
      {!isLoading && !hasError && !data.length && 'Ошибка - нет массива'}
      {!isLoading && !hasError && data.length && (
        <main className={AppStyles.content}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </main>
      )}
    </div>
  );
}

export default App;
