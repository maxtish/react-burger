import React from 'react';
import AppStyles from './app.module.css';
import dataIngredients from '../../utils/data';
import dataURL from '../../utils/dataURL';
import AppHeader from '../appheader/appheader';
import BurgerIngredients from '../burgeringredients/burgeringredients';
import BurgerConstructor from '../burgerconstructor/burgerconstructor';

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
        console.log('Ошибка', res.status);
      }

      const data = await res.json();
      const arr = data.data;
      setState({ ...state, data: arr, hasError: false, isLoading: false });
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
