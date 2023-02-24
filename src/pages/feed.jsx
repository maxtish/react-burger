import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AllCurrentOrders from '../components/all-current-orders/all-current-orders';
import Statistics from '../components/statistics/statistics';
import styles from './feed.module.css';
import { wsConnectionOpen, wsConnectionClose } from '../services/actions/wsActions';

export function FeedPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionOpen('/all'));

    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);
  return (
    <section aria-label="feed-page" className={`${styles.grid} container pr-10 pl-10`}>
      <h1 className={`text text_type_main-large pt-10 pb-5 ${styles.title}`}>Лента заказов</h1>
      <AllCurrentOrders />
      <Statistics />
    </section>
  );
}
