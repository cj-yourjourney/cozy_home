import  axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const addToCart =
  (id, checkInDate, checkOutDate, datesInRange) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}/`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        id: data.id,
        name: data.name,
        price: data.price,
        description: data.description,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        datesInRange: datesInRange,
        totalNight: datesInRange.length
      },
    });
    console.log("add to local storage");
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,  
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}