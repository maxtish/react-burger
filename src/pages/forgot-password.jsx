import { React, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { getForgotPasswordAction } from '../services/actions/password';
import styles from './authorization-form.module.css';

export function ForgotPasswordPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [valueEmail, setValueEmail] = useState('');

  const forgotPasswordStatus = useSelector((state) => state.forgotPassword.forgotPasswordStatus);
  console.log('forgotPasswordStatus-', forgotPasswordStatus);
  function handleSubmit(e) {
    e.preventDefault();
    console.log('ввел-', valueEmail);
    dispatch(getForgotPasswordAction({ email: valueEmail }));
  }
  useEffect(() => {
    if (forgotPasswordStatus) {
      return navigate('/reset-password');
    }
  }, [forgotPasswordStatus]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit} method="post">
          <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
          <Input
            type={'email'}
            placeholder={'Укажите E-mail'}
            onChange={(e) => setValueEmail(e.target.value)}
            icon={'CurrencyIcon'}
            value={valueEmail}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </form>
        <div className={`${styles.container__footer} mt-20 text text_type_main-default text_color_inactive`}>
          <div className={styles.question}>
            <p className="text">Вспомнили пароль?</p>
            <Link to="/login" className={`${styles.link} ml-1`}>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
