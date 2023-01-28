import { React, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

const login = () => {};
export function LoginPage() {
  ///Input
  const [value, setValue] = useState('value');
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
          <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setValue(e.target.value)}
            icon={'CurrencyIcon'}
            value={value}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <PasswordInput onChange={(e) => setValuePassword(e.target.value)} value={valuePassword} name="password" />
          <Button type="primary" size="medium">
            Войти
          </Button>
        </form>
        <div className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}>
          <div className={styles.question}>
            <p className="text">Вы - новый пользователь?</p>
            <Link to="/register" className={`${styles.link} ml-1`}>
              Зарегистрироваться
            </Link>
          </div>
          <div className={`${styles.question} mt-4`}>
            <p className="text">Забыли пароль?</p>
            <Link to="/recoverPassword" className={`${styles.link} ml-1`}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}