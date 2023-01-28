import { React, useEffect, useState } from 'react';
import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import ConstructorPage from '../../pages/constructor';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsIng } from '../../services/actions/ingredients';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
      <main className={AppStyles.content}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ConstructorPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
