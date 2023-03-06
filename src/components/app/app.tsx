import { useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AppHeader } from '../app-header/app-header';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
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
  const isAuth = useSelector((state) => state.user.isAuth);
  const ingredients = useSelector((state) => state.ingredients);
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

              <Route path="register" element={<ProtectedRoute anonymous={true} children={<RegisterPage />} />} />

              <Route
                path="forgot-password"
                element={<ProtectedRoute anonymous={true} children={<ForgotPasswordPage />} />}
              />

              <Route path="reset-password" element={<ProtectedRoute children={<ResetPasswordPage />} />} />
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
                  <ProtectedRoute
                    children={
                      <Modal onClose={onClose}>
                        <OrderMoreInfoPage />
                      </Modal>
                    }
                  />
                }
              />

              <Route
                path="/feed/:id"
                element={
                  <Modal onClose={onClose}>
                    <OrderMoreInfoPage />
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
