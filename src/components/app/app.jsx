import React from 'react';
import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import DataIngredientsContext from '../../utils/appContext';
import SelectedIngredientsContext from '../../utils/selContext';
import { getIngredients } from '../../utils/api';
function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  //
  const [selectedIngredients, setSelectedIngredients] = React.useState([]);

  React.useEffect(() => {
    getIngredients()
      .then((data) => {
        setState({ ...state, data: data.data, hasError: false, isLoading: false });
      })

      .catch((error) => {
        console.log('error:', error);
        setState({ ...state, hasError: true, isLoading: false });
      });
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
          <DataIngredientsContext.Provider value={data}>
            <SelectedIngredientsContext.Provider value={{ selectedIngredients, setSelectedIngredients }}>
              <BurgerIngredients />

              <BurgerConstructor />
            </SelectedIngredientsContext.Provider>
          </DataIngredientsContext.Provider>
        </main>
      )}
    </div>
  );
}

export default App;
