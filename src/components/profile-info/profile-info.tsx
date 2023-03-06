import { useState } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { SAVE_PASSWORD } from '../../services/actions/password';
import { updateUser } from '../../services/actions/user';
import { TInput } from '../../services/types/data';

import styles from './profile-info.module.css';

export function ProfileInfo() {
  const [valueName, setValueName] = useState<TInput>({ value: ' ', isChange: false });
  const [valueEmail, setValueEmail] = useState<TInput>({ value: ' ', isChange: false });
  const [valuePassword, setValuePassword] = useState<TInput>({ value: ' ', isChange: false });

  const dispatch = useDispatch();

  const { name, email } = useSelector((state) => state.user.userData);
  const password = useSelector((state) => state.forgotPassword.password);

  const cancel = () => {
    setValueName({ value: name, isChange: false });
    setValuePassword({ value: password, isChange: false });
    setValueEmail({ value: email, isChange: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateUser({
        email: valueEmail.isChange ? valueEmail.value : email,
        password: valuePassword.isChange ? valuePassword.value : password,
        name: valueName.isChange ? valueName.value : name,
      })
    );
    if (valuePassword.isChange) {
      dispatch({
        type: SAVE_PASSWORD,
        password: valuePassword.value,
      });
    }
    cancel();
  };

  return (
    <form className={`${styles.form} mt-30`} onSubmit={handleSubmit} method="patch">
      <div className={styles.wrapper}>
        <Input
          type="text"
          placeholder="Имя"
          onChange={(e) => setValueName({ value: e.target.value, isChange: true })}
          icon="EditIcon"
          value={valueName.isChange ? valueName.value : name}
          name="name"
        />
      </div>
      <div className={styles.wrapper}>
        <EmailInput
          placeholder="Логин"
          onChange={(e) => setValueEmail({ value: e.target.value, isChange: true })}
          isIcon={true}
          value={valueEmail.isChange ? valueEmail.value : email}
          name="email"
        />
      </div>
      <div className={styles.wrapper}>
        <PasswordInput
          placeholder="Пароль"
          onChange={(e) => setValuePassword({ value: e.target.value, isChange: true })}
          icon="EditIcon"
          value={valuePassword.isChange ? valuePassword.value : password}
          name="password"
        />
      </div>

      {(valueName.isChange || valueEmail.isChange || valuePassword.isChange) && (
        <div className={styles.buttons}>
          <Button htmlType="button" type="secondary" size="medium" onClick={cancel}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
}
