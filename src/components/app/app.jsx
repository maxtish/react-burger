import React from 'react';
import AppStyles from './app.module.css';
import dataIngredients from '../../utils/data';
import AppHeader from '../appheader/appheader';
import BurgerIngredients from '../burgeringredients/burgeringredients';
import BurgerConstructor from '../burgerconstructor/burgerconstructor';

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  React.useEffect(() => {
    const getIngredients = async () => {
      setState({ ...state, hasError: false, isLoading: true });
      const res = await fetch('https://norma.nomoreparties.space/api/ingredients');
      const data = await res.json();
      const arr = data.data;
      setState({ ...state, data: arr, hasError: false, isLoading: false });
    };
    getIngredients();
  }, []);
  const { isLoading, hasError, data } = state;

  console.log(data);

  return (
    <div className={AppStyles.page}>
      <AppHeader />

      {isLoading && 'Загрузка...'}
      {hasError && 'Ошибка'}
      {!isLoading && !hasError && !data.length && 'Ошибка - нет массива'}
      {!isLoading && !hasError && data.length && (
        <div className={AppStyles.content}>
          <BurgerIngredients dataIngredients={data} />
          <BurgerConstructor dataIngredients={dataIngredients} />
        </div>
      )}
    </div>
  );
}

export default App;
/*{!isLoading && !hasError && <BurgerIngredients dataIngredients={data} />}
        {!isLoading && !hasError && <BurgerConstructor dataIngredients={data} />}*/
