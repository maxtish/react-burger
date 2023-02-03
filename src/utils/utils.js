import moment from 'moment-timezone';
export function setCookie(name, value, props) {
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

export const getCookie = (name) => {
  return document.cookie.split('; ').reduce((r, v) => {
    const parts = v.split('=');
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, '');
};

export const deleteCookie = (name, path) => {
  setCookie(name, '', -1, path);
};

//день время и часовой пояс заказа
moment().locale('ru');
const orderDateMoment = (order) => moment(order.createdAt).format('HH:mm[ i-GMT]');
const utc = moment().utcOffset() / 60;

const fromNow = (order) => {
  const dif = moment().diff(order.createdAt, 'days');
  return dif === 0 ? 'Сегодня' : dif === 1 ? 'Вчера' : dif > 1 ? moment(order.createdAt).locale('ru').fromNow() : null;
};
export const formatHumanDate = (order) => {
  return `${fromNow(order)}, ${orderDateMoment(order)}+${utc}`;
};
