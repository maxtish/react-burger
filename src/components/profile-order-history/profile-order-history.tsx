import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import OrderPreview from '../order-preview/order-preview';
import { wsConnectionOpen, wsConnectionClose } from '../../services/actions/wsActions';
import { getCookie } from '../../utils/utils';
import styles from './profile-order-history.module.css';
import { IOrder } from '../../services/types/data';

export function ProfileОrderHistory() {
  const dispatch = useDispatch();

  const token = getCookie('accessToken');

  useEffect(() => {
    dispatch(wsConnectionOpen(`?token=${token}`));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  const orders: Array<IOrder> = useSelector((state) => state.ws.orders);

  if (!orders) {
    return null;
  }

  const reversed = Array.from(orders).reverse();

  return (
    <>
      {reversed && (
        <section className={`${styles.history} mt-10`}>
          <ul className={`${styles.scroll} custom-scroll text`}>
            {reversed.map((item: IOrder) => (
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
