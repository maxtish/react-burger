import { React, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import styles from './profile-nav.module.css';

let activeLinkProfile = true;
let activeLinkOrders = false;

export function ProfileNav() {
  return (
    <div className={styles.container}>
      <nav>
        <NavLink
          exact
          to="/profile"
          className={`${styles.link} text text_type_main-medium text_color_inactive `}
          activeStyle={{ color: ' white' }}
        >
          Профиль
        </NavLink>

        <NavLink
          exact
          to="/profile/orders"
          className={`${styles.link} text text_type_main-medium text_color_inactive`}
          activeStyle={{ color: ' white' }}
        >
          История заказов
        </NavLink>

        <button className={`${styles.exit}  text text_type_main-medium text_color_inactive `} onClick={''}>
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
