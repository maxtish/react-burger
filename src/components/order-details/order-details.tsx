import OrderDetailsStyles from './order-details.module.css';
import { useSelector } from '../../services/hooks/hooks';

function OrderDetails() {
  const { orderNumber, orderLoading, orderError } = useSelector((store) => store.order);

  return (
    <>
      {orderLoading && <h3 className="text text_type_digits-large mt-9 mb-8">Загрузка...</h3>}
      {orderError && <h3 className="text text_type_digits-large mt-9 mb-8">'Ошибка'</h3>}
      {!orderLoading && !orderError && (
        <>
          <h3 className="text text_type_digits-large mt-9 mb-8">{orderNumber}</h3>
          <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
          <div className={OrderDetailsStyles.done}></div>

          <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive mb-30">
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </>
  );
}

export default OrderDetails;
