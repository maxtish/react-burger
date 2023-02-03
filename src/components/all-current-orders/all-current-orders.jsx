import styles from './all-current-orders.module.css';
import { useSelector } from 'react-redux';
import OrderPreview from '../order-preview/order-preview';

function AllCurrentOrders() {
  const orders = useSelector((state) => state.ws.orders);

  return (
    <section className={styles.grid}>
      <ul className={`${styles.scroll} custom-scroll`}>
        {orders &&
          orders.map((item) => (
            <li key={item.number.toString()} className={styles.item}>
              <OrderPreview order={item} isStatus={false} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default AllCurrentOrders;
