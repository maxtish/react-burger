import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

export const ProtectedRouteElement = ({ children }) => {
  const forgotPasswordStatus = useSelector((state) => state.forgotPassword.forgotPasswordStatus);

  const location = useLocation();
  const isAuth = useSelector((state) => state.user.isAuth);

  function redirect(message) {
    return message.slice(0, 8) === '/profile';
  }
  if (!isAuth) {
    if (!redirect(location.pathname)) {
      if (location.pathname === '/reset-password') {
        if (!forgotPasswordStatus) {
          return <Navigate to="/login" />;
        }
      }
      return children;
    } else {
      return <Navigate to="/login" state={{ from: location }} />;
    }
  } else {
    if (location.pathname === '/register') {
      return <Navigate to="/" />;
    }
    if (location.pathname === '/forgot-password') {
      return <Navigate to="/" />;
    }
    if (location.pathname === '/reset-password') {
      return <Navigate to="/" />;
    }
  }
  return children;
};
