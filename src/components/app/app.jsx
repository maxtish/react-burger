import { React, useEffect, useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, RouterProvider } from 'react-router-dom';
import AppStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsIng } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/user';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {
  ConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
} from '../../pages/index';

function App() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const onClose = useCallback(() => {
    navigation(-1);
  }, [navigation]);

  useEffect(() => {
    dispatch(getItemsIng());
    dispatch(getUser());
  }, []);
  const ingredients = useSelector((store) => {
    return store.ingredients.data;
  });
  const location = useLocation();
  console.log('locationApp', location);

  const background = location.state?.background;
  console.log('backgroundApp', background);
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route
            path="register"
            element={
              <ProtectedRouteElement>
                <RegisterPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="forgot-password"
            element={
              <ProtectedRouteElement>
                <ForgotPasswordPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="reset-password"
            element={
              <ProtectedRouteElement>
                <ResetPasswordPage />
              </ProtectedRouteElement>
            }
          />
          <Route
            path="profile/*"
            element={
              <ProtectedRouteElement>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal header="Детали ингредиента" onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;

/*
{background && (
        <Routes location={location}>
          <Route
            path="/ingredients/:id"
            element={
              <Modal header="Детали ингредиента" onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    */
