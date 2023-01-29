import { React, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Input, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './profile-info.module.css';

const login = () => {};
export function ProfileInfo() {
  ///Input
  const [valueName, setValueName] = useState('');
  const [valuePassword, setValuePassword] = useState('');
  const [valueEmail, setValueEmail] = useState('');

  return (
    <form className={styles.form} onSubmit={login} method="post">
      <div className={styles.wrapper}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setValueName({ value: e.target.value })}
          icon="EditIcon"
          value={''}
          name="name"
        />
      </div>
      <div className={styles.wrapper}>
        <EmailInput
          placeholder="Логин"
          onChange={(e) => setValueEmail(e.target.value)}
          icon="EditIcon"
          value={''}
          name="email"
        />
      </div>
      <div className={styles.wrapper}>
        <PasswordInput
          placeholder="Пароль"
          onChange={(e) => setValuePassword({ value: e.target.value })}
          icon="EditIcon"
          value={''}
          name="password"
        />
      </div>
    </form>
  );
}
