import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import styles from './order-more-info.module.css';
import OrderMoreInfo from '../components/order-more-info/order-more-info';
import {
  wsConnectionStartAll,
  wsConnectionStartUser,
  wsConnectionClosedAll,
  wsConnectionClosedUser,
} from '../services/actions/wsActions';

import { useLocation, useParams } from 'react-router-dom';

export function OrderMoreInfoPage() {
  const dispatch = useDispatch();
  //const match = useRouteMatch();

  const location = useLocation();

  const match = location.pathname;

  useEffect(() => {
    if (match === '/feed/:id') {
      dispatch(wsConnectionStartAll());
    } else {
      dispatch(wsConnectionStartUser());
    }
    dispatch(wsConnectionStartAll());

    return () => {
      if (match === '/feed/:id') {
        dispatch(wsConnectionClosedAll());
      } else {
        dispatch(wsConnectionClosedUser());
      }
    };
  }, [dispatch, location.pathname]);

  const orders = useSelector((state) => state.ws.orders);

  const { id } = useParams();

  if (!orders) {
    return;
  }

  const order = orders.find((item) => item._id === id);

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
