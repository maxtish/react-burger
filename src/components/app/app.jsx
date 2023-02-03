import { React, useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsIng } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/user';
import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderMoreInfo from '../order-more-info/order-more-info';
import {
  ConstructorPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  ProfilePage,
  IngredientPage,
  FeedPage,
  OrderMoreInfoPage,
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

  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="feed/:id" element={<OrderMoreInfoPage />} />

          <Route
            path="profile/*"
            element={
              <ProtectedRouteElement>
                <ProfilePage />
              </ProtectedRouteElement>
            }
          />

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
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path="/feed/:id"
            element={
              <Modal onClose={onClose}>
                <OrderMoreInfo />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <Modal onClose={onClose}>
                <OrderMoreInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
