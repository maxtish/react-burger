import React from 'react';
import HeaderStyles from './appheader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

class AppHeader extends React.Component {
  render() {
    const mainData = {
      title: 'Группа ',
    };

    return (
      <div className={HeaderStyles.header}>
        <nav>
          <ul className={HeaderStyles.list}>
            <li className={HeaderStyles.item}>
              <BurgerIcon type="primary" /> <a className={HeaderStyles.link}>Конструктор</a>
            </li>
            <li className={HeaderStyles.item}>
              <ListIcon type="primary" />
              <a className={HeaderStyles.link}>Лента заказов</a>
            </li>
          </ul>
        </nav>
        <div className={HeaderStyles.logo}>
          <Logo />
        </div>
        <div className={HeaderStyles.navlink}>
          <ProfileIcon type="primary" />
          <a className={HeaderStyles.link}>Личный кабинет</a>
        </div>
      </div>
    );
  }
}

export default AppHeader;
