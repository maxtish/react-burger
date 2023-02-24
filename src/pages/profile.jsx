import { Outlet } from 'react-router-dom';

import styles from './profile.module.css';

export function ProfilePage() {
  return (
    <section className={`${styles.container}`}>
      <Outlet />
    </section>
  );
}
