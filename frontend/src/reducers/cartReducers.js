import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

const initialState = {
 cartItems: [],
 shippingAddress: {}
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case CART_ADD_ITEM:
      const item = action.payload 
      const existItem = state.cartItems.find(x => x.id === item.id)
      
      if(existItem){
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existItem.id ? item : x
          ),
          
        };
      } else {
        const newState = {
          ...state, 
          cartItems: [...state.cartItems, item]
        }
        console.log('updated state', newState)
        return newState
      }
    case CART_REMOVE_ITEM:
      const productId = action.payload
     
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== productId),
      };

    case CART_CLEAR_ITEMS:
      return {...state,
              cartItems: []
      }  
    default:
      return state;
  }
};