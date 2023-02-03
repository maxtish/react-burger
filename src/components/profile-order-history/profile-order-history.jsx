import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OrderPreview from '../order-preview/order-preview';
import { wsConnectionStartUser, wsConnectionClosedUser } from '../../services/actions/wsActions';
import styles from './profile-order-history.module.css';

export default function ProfileОrderHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectionStartUser());
    return () => {
      dispatch(wsConnectionClosedUser());
    };
  }, []);

  const ws = useSelector((state) => state.ws);

  const orders = useSelector((state) => state.ws.orders);

  if (!orders) {
    return null;
  }

  const reversed = Array.from(orders).reverse();

  return (
    <>
      {' '}
      {reversed && (
        <section className={`${styles.history} mt-10`}>
          <ul className={`${styles.scroll} custom-scroll text`}>
            {reversed.map((item) => (
              <li key={item.number.toString()}>
                <OrderPreview order={item} isStatus={true} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
