import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  VIEWING_ORDER_ENABLED,
  VIEWING_ORDER_DISABLED,
} from '../actions/order';

let initialState = {
  orderDetails: {},
  orderLoading: false,
  orderError: false,
  visibleOrderModal: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderLoading: true,
        orderError: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderLoading: false,
        orderError: false,
        orderDetails: action.order,
      };
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderLoading: false,
        orderError: true,
        orderDetails: {},
      };
    }

    case VIEWING_ORDER_ENABLED: {
      return {
        ...state,
        visibleOrderModal: true,
      };
    }
    case VIEWING_ORDER_DISABLED: {
      return {
        ...state,
        visibleOrderModal: false,
      };
    }

    // Реакция на прочие типы экшенов
    default:
      return state;
  }
};
