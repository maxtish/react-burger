import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getResetPasswordAction } from '../services/actions/password';
import { SAVE_PASSWORD } from '../services/actions/password';
import styles from './authorization-form.module.css';

export function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      getResetPasswordAction({
        password: newPassword,
        token: token,
      })
    );
    dispatch({
      type: SAVE_PASSWORD,
      password: newPassword,
    });
  }
  const resetPasswordStatus = useSelector((state) => state.forgotPassword.resetPasswordStatus);

  useEffect(() => {
    if (location.state !== '/forgot-password') {
      return navigate('/login');
    }
    if (resetPasswordStatus) {
      return navigate('/login');
    }
  }, [resetPasswordStatus]);

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit} method="post">
          <h1 className={`text text_type_main-medium ${styles.title}`}>Восстановление пароля</h1>
          <PasswordInput
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={'Пароль'}
            value={newPassword}
            name="password"
          />
          <Input
            type={'text'}
            placeholder={'Введите код из письма'}
            onChange={(e) => setToken(e.target.value)}
            icon={'CurrencyIcon'}
            value={token}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            extraClass="ml-1"
          />

          <Button onClick={handleSubmit} type="primary" size="medium">
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
