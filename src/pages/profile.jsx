import { Routes, Route } from 'react-router-dom';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { ProfileInfo } from '../components/profile-info/profile-info';
import styles from './profile.module.css';

export function ProfilePage() {
  return (
    <section className={`${styles.container} text mt-30`}>
      <ProfileNav />
      <Routes>
        <Route index element={<ProfileInfo />} />
        <Route path="orders/*" element={'test'} />
      </Routes>
    </section>
  );
}
