import React from 'react';
import AppStyles from './app.module.css';
import dataIngredients from '../../utils/data';
import dataURL from '../../utils/data-URL';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const getIngredients = async () => {
    try {
      setState({ ...state, hasError: false, isLoading: true });
      const res = await fetch(dataURL);

      if (!res.ok) {
        setState({ ...state, hasError: true, isLoading: false });
        return Promise.reject(`Ошибка ${res.status}`);
      }
      const data = await res.json();
      setState({ ...state, data: data.data, hasError: false, isLoading: false });
    } catch (error) {
      setState({ ...state, hasError: true, isLoading: false });
    }
  };

  React.useEffect(() => {
    getIngredients();
  }, []);

  const { isLoading, hasError, data } = state;

  return (
    <div className={AppStyles.page}>
      <AppHeader />

      {isLoading && 'Загрузка...'}
      {hasError && 'Ошибка'}
      {!isLoading && !hasError && !data.length && 'Ошибка - нет массива'}
      {!isLoading && !hasError && data.length && (
        <main className={AppStyles.content}>
          <BurgerIngredients dataIngredients={data} />
          <BurgerConstructor dataIngredients={dataIngredients} />
        </main>
      )}
    </div>
  );
}

export default App;
