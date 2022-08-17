import OrderDetailsStyles from './orderdetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
function OrderDetails({ id }) {
  return (
    <>
      <h3 className="text text_type_digits-large mt-9 mb-8">{id}</h3>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <div className={OrderDetailsStyles.done}></div>

      <p className="text text_type_main-default mt-15 mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}

export default OrderDetails;
