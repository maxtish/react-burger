import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import HeaderStyles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export function AppHeader() {
  return (
    <div className={HeaderStyles.page}>
      <header className={`${HeaderStyles.header} pt-4 pb-4`}>
        <nav>
          <ul className={HeaderStyles.list}>
            <li className={`${HeaderStyles.item} pl-5 pr-5 pt-4 pb-4`}>
              <BurgerIcon type="secondary" />{' '}
              <NavLink
                className={`${HeaderStyles.link} text text_type_main-default text_color_inactive pl-2`}
                style={({ isActive }) => ({ color: isActive && 'white' })}
                to="/"
              >
                Конструктор
              </NavLink>
            </li>
            <li className={`${HeaderStyles.item} pl-5 pr-5 pt-4 pb-4`}>
              <ListIcon type="secondary" />
              <NavLink
                className={`${HeaderStyles.link} text text_type_main-default text_color_inactive pl-2`}
                style={({ isActive }) => ({ color: isActive && 'white' })}
                to="/profile/orders"
              >
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={HeaderStyles.logo}>
          <Logo />
        </div>

        <div className={`${HeaderStyles.navlink} pl-5 pr-5 pt-4 pb-4`}>
          <ProfileIcon type="secondary" />
          <NavLink
            className={`${HeaderStyles.link} text text_type_main-default text_color_inactive pl-2`}
            style={({ isActive }) => ({ color: isActive && 'white' })}
            to="/profile"
          >
            Личный кабинет
          </NavLink>
        </div>
      </header>
      <main className={HeaderStyles.content}>
        <Outlet />
      </main>
    </div>
  );
}
