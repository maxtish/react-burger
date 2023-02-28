import { useDispatch, useSelector } from '../services/hooks/hooks';
import { useEffect } from 'react';
import styles from './order-more-info-page.module.css';
import OrderMoreInfo from '../components/order-more-info/order-more-info';
import { wsConnectionOpen, wsConnectionClose } from '../services/actions/wsActions';
import { getCookie } from '../utils/utils';

import { useLocation, useParams } from 'react-router-dom';
import { IOrder } from '../services/types/data';

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

  const orders: Array<IOrder> = useSelector((state) => {
    return state.ws.orders;
  });

  const { id } = useParams();

  const order = orders?.find((item: IOrder) => item._id === id);

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
