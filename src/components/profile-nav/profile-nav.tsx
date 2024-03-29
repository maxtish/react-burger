import { useEffect, useCallback } from 'react';
import { useDispatch } from '../../services/hooks/hooks';
import { NavLink, useLocation } from 'react-router-dom';
import { signOut, getUser } from '../../services/actions/user';
import styles from './profile-nav.module.css';

export function ProfileNav() {
  const location = useLocation();
  let activeLinkOrder = false;
  let activeLinkProfile = false;

  if (location.pathname === '/profile/orders') {
    activeLinkOrder = true;
  }

  if (location.pathname === '/profile') {
    activeLinkProfile = true;
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const logout = useCallback(() => {
    dispatch(signOut());
  }, [dispatch]);

  return (
    <div className={`${styles.container} mt-30`}>
      <nav>
        <NavLink
          to="/profile"
          style={() => ({ color: location.pathname === '/profile' ? 'white' : '' })}
          className={`${styles.link} text text_type_main-medium text_color_inactive `}
        >
          Профиль
        </NavLink>

        <NavLink
          to="/profile/orders"
          style={() => ({ color: location.pathname === '/profile/orders' ? 'white' : '' })}
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
      {activeLinkOrder && (
        <p className={`${styles.info} text text_type_main-default text_color_inactive mt-20 pt-2`}>
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      )}
    </div>
  );
}
