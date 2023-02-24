import { useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { useDispatch, useSelector } from 'react-redux';
import { getItemsIng } from '../../services/actions/ingredients';
import { getUser } from '../../services/actions/user';
import { ProtectedRoute } from '../protected-route-element/protected-route-element';
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
import { ProfileNav } from '../profile-nav/profile-nav';
import { ProfileОrderHistory } from '../profile-order-history/profile-order-history';
import { ProfileInfo } from '../profile-info/profile-info';
import { getCookie } from '../../utils/utils';

function App() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const onClose = useCallback(() => {
    navigation(-1);
  }, [navigation]);

  useEffect(() => {
    dispatch(getItemsIng());
    if (getCookie('accessToken') !== '') return dispatch(getUser());
  }, [dispatch]);

  let ingredients = useSelector((state) => state.ingredients);
  const location = useLocation();

  const background = location.state?.background;

  return (
    <>
      {ingredients.isLoading ? (
        'Загрузка'
      ) : ingredients.hasError ? (
        <h1>Произошла ошибка при получении данных</h1>
      ) : (
        <>
          <Routes location={background || location}>
            <Route path="/" element={<AppHeader />}>
              <Route index element={<ConstructorPage />} />
              <Route path="ingredients/:id" element={<IngredientPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="feed" element={<FeedPage />} />
              <Route path="feed/:id" element={<OrderMoreInfoPage />} />

              <Route
                path="profile"
                element={
                  <ProtectedRoute anonymous={false}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={
                    <>
                      <ProfileNav />
                      <ProfileInfo />
                    </>
                  }
                />

                <Route
                  path="/profile/orders"
                  element={
                    <>
                      <ProfileNav />
                      <ProfileОrderHistory />
                    </>
                  }
                />
              </Route>

              <Route path="/profile/orders/:id" element={<OrderMoreInfoPage />} />

              <Route
                path="register"
                element={
                  <ProtectedRoute anonymous={true}>
                    <RegisterPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="forgot-password"
                element={
                  <ProtectedRoute anonymous={true}>
                    <ForgotPasswordPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="reset-password"
                element={
                  <ProtectedRoute>
                    <ResetPasswordPage />
                  </ProtectedRoute>
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
                path="/profile/orders/:id"
                element={
                  <ProtectedRoute>
                    <Modal onClose={onClose}>
                      <OrderMoreInfo />
                    </Modal>
                  </ProtectedRoute>
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
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
