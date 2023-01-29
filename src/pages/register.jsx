import { React, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { SAVE_PASSWORD } from '../services/actions/password';
import { getNewUser } from '../services/actions/user';
import styles from './authorization-form.module.css';

export function RegisterPage() {
  const dispatch = useDispatch();

  ///Input
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const submitUserData = (e) => {
    e.preventDefault();
    dispatch(
      getNewUser({
        email: newEmail,
        password: newPassword,
        name: newName,
      })
    );
    dispatch({
      type: SAVE_PASSWORD,
      password: newPassword,
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={submitUserData} method="post">
          <h1 className={`text text_type_main-medium ${styles.title}`}>Регистрация</h1>
          <Input
            type={'text'}
            placeholder={'Имя'}
            onChange={(e) => setNewName(e.target.value)}
            icon={'CurrencyIcon'}
            value={newName}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setNewEmail(e.target.value)}
            icon={'CurrencyIcon'}
            value={newEmail}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <PasswordInput
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={'Пароль'}
            value={newPassword}
            name="password"
          />
          <Button type="primary" size="medium">
            Регистрация
          </Button>
        </form>
        <div className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}>
          <div className={`${styles.question} mt-4`}>
            <p className="text">Уже зарегистрированы?</p>
            <Link to="/login" className={`${styles.link} ml-1`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
