import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export function ProtectedRoute({ children, anonymous = false }) {
  const isLoggedIn = useSelector((state) => state.user.isAuth);

  const location = useLocation();
  const from = location.state?.from || '/';
  const order = location.state?.order;

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isLoggedIn) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />;
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isLoggedIn) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location, order: order }} />;
  }

  // Если все ок, то рендерим внутреннее содержимое
  return children;
}
