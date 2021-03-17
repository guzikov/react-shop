import {
  CART_ADD_PRODUCT,
  CART_REMOVE_PRODUCT,
} from '../constants/cartConstants'
export const cartReduser = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      const existItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      )
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        }
      }
    default:
      return state
  }
}
