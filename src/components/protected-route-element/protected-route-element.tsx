import React, { FC, ReactNode } from 'react';
import { useSelector } from '../../services/hooks/hooks';
import { Navigate, useLocation, RouteProps } from 'react-router-dom';

export const ProtectedRoute: FC<RouteProps & { children?: ReactNode; anonymous?: boolean }> = ({
  children,
  anonymous = false,
}) => {
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
  return <>{children}</>;
};
