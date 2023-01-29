import { React, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { ProfileNav } from '../components/profile-nav/profile-nav';
import { ProfileInfo } from '../components/profile-info/profile-info';
import styles from './profile.module.css';

export function ProfilePage() {
  return (
    <section className={`${styles.container} text mt-30`}>
      <ProfileNav />
      <ProfileInfo />
    </section>
  );
}
