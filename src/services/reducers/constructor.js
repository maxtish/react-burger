//
import {
  CONSTRUCTOR_ADD,
  GET_INGREDIENTS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  VIEWING_ORDER_ENABLED,
  VIEWING_ORDER_DISABLED,
  ADD_SELECTED_ING,
  DELETE_ING,
  TOGGLE_ING,
} from '../actions/constructor';

let initialState = {
  selectedBun: null,
  selectedIngredients: [],
  order: {},
  orderLoading: false,
  orderError: false,
  visibleOrderModal: false,
};

// Редьюсер

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTRUCTOR_ADD: {
      if (action.payload.type === 'bun') {
        return { ...state, selectedBun: action.payload };
      }

      return {
        ...state,
        selectedIngredients: [...state.selectedIngredients, action.payload],
      };
    }

    case TOGGLE_ING: {
      const indexElHover = action.hoverIndex; //над дим
      const indexElDrag = action.dragIndex; // он
      const elementSelect = state.selectedIngredients.filter((item) => item.id === action.dragIndex.item.id);

      /*function moveObjectAtIndex(array, sourceIndex, destIndex) {
        var placeholder = elementSelect;
        // удалите объект из его исходного положения и
        // установите объект-заполнитель на его место, чтобы
        // сохранить длину массива постоянной
        var objectToMove = array.splice(sourceIndex, 1, placeholder)[0];
        // выньте временный объект
        array.splice(destIndex, 0, objectToMove);
        /// поместите объект в нужное положение
        array.splice(array.indexOf(placeholder), 1);
        return array;
      }*/
      function moveItem(arr, fromIndex, toIndex) {
        let itemRemoved = arr.splice(fromIndex, 1); // assign the removed item as an array
        arr.splice(toIndex, 0, itemRemoved[0]); // insert itemRemoved into the target index
        return arr;
      }

      return {
        ...state,
        selectedIngredients: moveItem(state.selectedIngredients, indexElDrag, indexElHover),
      };
    }

    case GET_INGREDIENTS: {
      state.selectedIngredients.unshift(action.ing);
      let bun = state.selectedIngredients.filter((item) => item.type === 'bun');
      // если клик по булке и в массиве есть уже булка
      // тогда удаляем старую булку и добавляем новую
      if ((action.ing.type === 'bun') & (bun.length > 0)) {
        bun = {};
        bun = action.ing;
        state.selectedIngredients = state.selectedIngredients.filter((item) => item.type !== 'bun');
        state.selectedIngredients.unshift(bun);
      }

      return {
        ...state,
        selectedIngredients: state.selectedIngredients,
      };
    }
    case ADD_SELECTED_ING: {
      state.selectedIngredients.unshift(action.item);
      let bun = state.selectedIngredients.filter((item) => item.type === 'bun');
      // если клик по булке и в массиве есть уже булка
      // тогда удаляем старую булку и добавляем новую
      if ((action.item.type === 'bun') & (bun.length > 0)) {
        bun = {};
        bun = action.item;
        state.selectedIngredients = state.selectedIngredients.filter((item) => item.type !== 'bun');
        state.selectedIngredients.unshift(bun);
      }
      return {
        ...state,
        selectedIngredients: state.selectedIngredients,
      };
    }

    case DELETE_ING: {
      let bun = state.selectedIngredients.filter((item) => item.type === 'bun');
      state.selectedIngredients = state.selectedIngredients.filter((item) => item.type !== 'bun');
      state.selectedIngredients = state.selectedIngredients.filter((item, index) => index !== action.indexN);
      state.selectedIngredients = [].concat(state.selectedIngredients, bun);
      return {
        ...state,
        selectedIngredients: state.selectedIngredients,
      };
    }

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
        order: action.order,
      };
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderLoading: false,
        orderError: true,
        order: {},
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
