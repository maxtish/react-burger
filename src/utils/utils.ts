import moment from 'moment-timezone';
import { IOrder } from '../services/types/data';

export function setCookie(
  name: string,
  value: string,
  props: { [key: string]: any } & { expires?: string | number | Date } = {}
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  // @ts-ignore
  if (exp && exp.toUTCString) {
    // @ts-ignore
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
}

//день время и часовой пояс заказа
moment().locale('ru');

const orderDateMoment = (order: IOrder): string => moment(order.createdAt).format('HH:mm[ i-GMT]');

const utc: number = moment().utcOffset() / 60;

const fromNow = (order: IOrder): string => {
  const dif = moment().diff(order.createdAt, 'days');
  return dif === 0 ? 'Сегодня' : dif === 1 ? 'Вчера' : moment(order.createdAt).locale('ru').fromNow();
};
export const formatHumanDate = (order: IOrder): string => {
  return `${fromNow(order)}, ${orderDateMoment(order)}+${utc}`;
};
