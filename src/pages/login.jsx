import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../services/actions/user';
import { SAVE_PASSWORD } from '../services/actions/password';
import styles from './authorization-form.module.css';

export function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const fromPage = location.state?.from?.pathname || '/';

  const [valueEmail, setValueEmail] = useState('');
  const [valuePassword, setValuePassword] = useState('');

  const isAuth = useSelector((state) => state.user.isAuth);

  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    dispatch(signIn({ email: valueEmail, password: valuePassword }));
    dispatch({
      type: SAVE_PASSWORD,
      password: valuePassword,
    });
  };

  useEffect(() => {
    if (isAuth) {
      return navigate(fromPage);
    }
  }, [isAuth]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={login} method="post">
          <h1 className={`text text_type_main-medium ${styles.title}`}>Вход</h1>
          <Input
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setValueEmail(e.target.value)}
            value={valueEmail}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />
          <PasswordInput
            onChange={(e) => setValuePassword(e.target.value)}
            placeholder={'Пароль'}
            value={valuePassword}
            name="password"
          />
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
            <Link to="/forgot-password" className={`${styles.link} ml-1`}>
              Восстановить пароль
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
