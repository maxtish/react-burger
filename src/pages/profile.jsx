import { React, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BrowserRouter, Routes, Route, Router, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { ProfileInfo } from '../components/profile-info/profile-info';
import styles from './profile.module.css';

export function ProfilePage() {
  const isAuth = useSelector((state) => state.user.isAuth);
  console.log('isAuth-', isAuth);
  const navigate = useNavigate();
  const goHome = () => navigate('/', { replace: true });

  return (
    <section className={`${styles.container} text mt-30`}>
      <ProfileNav />
      <Routes>
        <Route index element={<ProfileInfo />} />
        <Route path="orders/*" element={'dsadsad'} />
      </Routes>
    </section>
  );
}
