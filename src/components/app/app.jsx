import { React, useEffect, useState } from 'react';
import AppStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsIng } from '../../services/actions/ingredients';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  ConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
} from '../../pages/index';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Отправляем экшен-функцию
    dispatch(getItemsIng());
  }, [dispatch]);

  const { hasError, isLoading, data } = useSelector((store) => store.ingredients);

  return (
    <BrowserRouter>
      <div className={AppStyles.page}>
        <AppHeader />
        <main className={AppStyles.content}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/" element={<ConstructorPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
