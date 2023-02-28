import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/hooks/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, useLocation } from 'react-router-dom';
import { formatHumanDate } from '../../utils/utils';
import { wsConnectionOpen } from '../../services/actions/wsActions';
import { IOrder, IIngredient } from '../../services/types/data';

import styles from './order-more-info.module.css';

function OrderMoreInfo() {
  const location = useLocation();

  const dispatch = useDispatch();
  const wsConnected = useSelector((store) => {
    return store.ws.wsConnected;
  });
  useEffect(() => {
    if (!wsConnected) {
      dispatch(wsConnectionOpen('/all'));
    } else return;
  }, []);

  const orders = useSelector((state) => state.ws.orders);
  const allIngredients = useSelector((state) => state.ingredients.data);

  const { id } = useParams();

  if (!orders) {
    return null;
  }

  const order: IOrder | undefined = orders.find((item: IOrder) => item._id === id);
  if (!order) {
    return null;
  }

  const orderNumber: number | undefined = order.number;
  type TIngredientQuantity = IIngredient & { quantity: number };
  //Сделаем новый массив ингредиентов в заказе в котором в объектах будет кол-во повторений этого ингредиента
  const orderIngrCount: Array<TIngredientQuantity> = allIngredients.reduce(
    (prevVal: Array<TIngredientQuantity>, item: IIngredient) => {
      order.ingredients.forEach((id) => {
        const itemInNewArr = prevVal.find((item) => item._id === id);
        if (item._id === id) {
          if (!itemInNewArr) {
            prevVal.push({
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: 1,
              _id: item._id,
            });
          } else {
            itemInNewArr.quantity++;
          }
          return prevVal;
        }
      });
      return prevVal;
    },
    []
  );

  //Если компонент открывается не отдельной страницей - то этот флаг поможет убрать номер заказа(он будет на уровне компонента Modal)
  const background = location.state?.background;

  //Cумму заказа
  const total = orderIngrCount.reduce((acc: number, item: TIngredientQuantity) => acc + item.price * item.quantity, 0);

  //Меняем текст статуса и его цвет
  let status = '';
  let colorStatus: string | undefined = undefined;

  switch (order.status) {
    case 'done':
      status = 'Выполнен';
      colorStatus = styles.done;
      break;
    case 'pending':
      status = 'Готовится';
      colorStatus = styles.pending;
      break;
    case 'created':
      status = 'Создан';
      colorStatus = styles.created;
      break;
    default:
      status = 'Отменен';
      colorStatus = styles.cancel;
      break;
  }

  //Положение заголовка? модальное окно или отдельная страница
  const styleModal = background ? styles.header : styles.separate;
  return (
    <>
      <h2 className={`text text_type_digits-default  pb-10 ${styleModal}`}>{`#${orderNumber}`}</h2>
      <h3 className={`${styles.header} text text_type_main-medium mb-3`}>{order.name}</h3>
      <p className={`${styles.status} ${colorStatus} text text_type_main-default`}>{status}</p>
      <h4 className={`${styles.header} text text_type_main-medium mt-15 mb-6`}>Состав:</h4>

      <ul className={`${styles.scroll} custom-scroll text`}>
        {orderIngrCount.map((item, index) => (
          <li key={index} className={`${styles.item} text`}>
            <div className={styles.imageBorder}>
              <img alt={item.name} src={item.image} className={styles.image} />
            </div>

            <p className="text text_type_main-default pl-5">{item.name}</p>
            <div className={styles.price}>
              <p className="text text_type_digits-default mr-1">
                {item.quantity} x {item.price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={`${styles.footer} mt-10`}>
        <p className={`${styles.timestamp}text text_type_main-default text_color_inactive `}>
          {formatHumanDate(order)}
        </p>
        <p className={`${styles.total} text text_type_digits-default mr-1`}>{total}</p>
        <CurrencyIcon type="primary" />
      </div>
    </>
  );
}

export default OrderMoreInfo;
