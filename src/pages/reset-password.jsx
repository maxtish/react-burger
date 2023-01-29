import { React, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './authorization-form.module.css';

const login = () => {};
export function ResetPasswordPage() {
  ///Input
  const [valueName, setValueName] = useState('ValueName');
  const [valueEmail, setValueEmail] = useState('ValueEmail');

  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert('Icon Click Callback');
  };

  //Password
  const [valuePassword, setValuePassword] = useState('password');
  const onChange = (e) => {
    setValuePassword(e.target.value);
  };
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={login} method="post">
          <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
          <PasswordInput
            onChange={(e) => setValuePassword(e.target.value)}
            placeholder={'Введите новый пароль'}
            value={''}
            name="password"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setValueName(e.target.value)}
            icon={'CurrencyIcon'}
            value={''}
            name={'name'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <Button type="primary" size="medium">
            Сохранить
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
