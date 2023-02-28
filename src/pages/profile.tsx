import { Outlet } from 'react-router-dom';
import styles from './profile.module.css';

export const ProfilePage = () => {
  return (
    <section className={`${styles.container}`}>
      <Outlet />
    </section>
  );
};
