import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../services/hooks/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { getForgotPasswordAction } from '../services/actions/password';
import styles from './authorization-form.module.css';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const fromPage = location.pathname || '/';
  const [valueEmail, setValueEmail] = useState('');

  const forgotPasswordStatus = useSelector((state) => state.forgotPassword.forgotPasswordStatus);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch(getForgotPasswordAction({ email: valueEmail }));
  }
  useEffect(() => {
    if (forgotPasswordStatus) {
      return navigate('/reset-password', { state: fromPage });
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

          <Button htmlType="submit" type="primary" size="medium" disabled={valueEmail === ''}>
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
