import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,

  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,

} from "../constants/orderConstants";

import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    // console.log('order: ', order);
    dispatch({ type: ORDER_CREATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders/add/", order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    // clear the cart here
    dispatch({
      type: CART_CLEAR_ITEMS,
    });
    // remove the cartItems from local storage
    localStorage.removeItem("cartItems");
    
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/orders/my-orders/", config);
   
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};