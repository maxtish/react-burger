import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { signOut, getUser } from '../../services/actions/user';
import styles from './profile-nav.module.css';

export function ProfileNav() {
  const location = useLocation();

  let activeLinkProfile = true;
  let activeLinkOrders = false;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <nav>
        <NavLink
          to="/profile"
          style={({ isActive }) => ({ color: location.pathname === '/profile' && 'white' })}
          className={`${styles.link} text text_type_main-medium text_color_inactive `}
        >
          Профиль
        </NavLink>

        <NavLink
          to="/profile/orders"
          style={({ isActive }) => ({ color: location.pathname === '/profile/orders' && 'white' })}
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
        >
          История заказов
        </NavLink>

        <button className={`${styles.exit}  text text_type_main-medium text_color_inactive `} onClick={logout}>
          Выход
        </button>
      </nav>

      {activeLinkProfile && (
        <p className={`${styles.info} text text_type_main-default text_color_inactive mt-20 pt-2`}>
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </p>
      )}
      {activeLinkOrders && (
        <p className={`${styles.info} text text_type_main-default text_color_inactive mt-20 pt-2`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      )}
    </div>
  );
}
