import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderStyles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function AppHeader() {
  return (
    <header className={`${HeaderStyles.header} pt-4 pb-4`}>
      <nav>
        <ul className={HeaderStyles.list}>
          <li className={`${HeaderStyles.item} pl-5 pr-5 pt-4 pb-4`}>
            <BurgerIcon type="primary" />{' '}
            <a href="#" className={`${HeaderStyles.link} text text_type_main-default ml-2`}>
              Конструктор
            </a>
          </li>
          <li className={`${HeaderStyles.item} pl-5 pr-5 pt-4 pb-4`}>
            <ListIcon type="secondary" />
            <a href="#" className={`${HeaderStyles.link} text text_type_main-default text_color_inactive ml-2`}>
              Лента заказов
            </a>
          </li>
        </ul>
      </nav>
      <div className={HeaderStyles.logo}>
        <Logo />
      </div>

      <div className={`${HeaderStyles.navlink} pl-5 pr-5 pt-4 pb-4`}>
        <ProfileIcon type="secondary" />
        <NavLink className={`${HeaderStyles.link} text text_type_main-default text_color_inactive pl-2`} to="/profile">
          Личный кабинет
        </NavLink>
      </div>
    </header>
  );
}
