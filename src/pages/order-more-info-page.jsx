import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './order-more-info-page.module.css';
import OrderMoreInfo from '../components/order-more-info/order-more-info';
import { wsConnectionOpen, wsConnectionClose } from '../services/actions/wsActions';
import { getCookie } from '../utils/utils';

import { useLocation, useParams } from 'react-router-dom';

export function OrderMoreInfoPage() {
  const dispatch = useDispatch();

  const token = getCookie('accessToken');

  const location = useLocation();

  const match = location.pathname;

  useEffect(() => {
    if (match.slice(0, 5) === '/feed') {
      dispatch(wsConnectionOpen('/all'));
    } else {
      if (match.slice(0, 15) === '/profile/orders') {
        dispatch(wsConnectionOpen(`?token=${token}`));
      }
    }

    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);

  const orders = useSelector((state) => {
    return state.ws.orders;
  });

  const { id } = useParams();

  const order = orders?.find((item) => item._id === id);

  return (
    <>
      {order && (
        <section aria-label="OrderMoreInfoPage" className={`${styles.wrapper}  `}>
          <div className={`${styles.container} `}>
            <OrderMoreInfo />
          </div>
        </section>
      )}
    </>
  );
}
