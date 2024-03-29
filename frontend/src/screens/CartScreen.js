import React, { useEffect, useState } from "react";
import { useParams, useLocation,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
import DatePicker from "react-datepicker";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import "react-datepicker/dist/react-datepicker.css";
import { getDatesInRange } from "../utils/dateUtils";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function CartScreen() {
  const productId = useParams().id;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  // Parse check-in and check-out dates from URL parameters
  const params = new URLSearchParams(location.search);
  const checkInDate = params.get("check-in");
  const checkOutDate = params.get("check-out");

  const datesInRange = getDatesInRange(checkInDate, checkOutDate);
  const totalNights = datesInRange.length;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate)
  const {success, loading, order} = orderCreate


  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * totalNights,
    0
  );

  // Check if totalPrice is a number before using toFixed
  const formattedTotalPrice = isNaN(totalPrice) ? 0 : totalPrice.toFixed(2);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, checkInDate, checkOutDate, datesInRange));
    }
  }, [dispatch, productId]);

   useEffect(() => {
     if (success) {
       dispatch({ type: ORDER_CREATE_RESET });
       navigate("/myorders/");
     }
   }, [success, navigate]);

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        totalPrice: formattedTotalPrice,
      })
    );
  };

  return (
    <div className="container mt-4">
      <h2>Shopping Cart</h2>

      <div className="row">
        {/* Left Column (About 60% of the width) */}
        <div className="col-md-8">
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.id} className="card mt-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">${item.price} per night </p>
                      <p>Total Nights: {item.totalNight}</p>
                      <p>Check-in: {item.checkInDate}</p>
                      <p> Check-out: {item.checkOutDate} </p>
                    </div>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeHandler(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Right Column (About 40% of the width) */}
        <div className="col-md-4 text-center">
          <div className="mt-3">
            <p>Total Price: ${formattedTotalPrice}</p>
            <button className="btn btn-primary w-100" onClick={placeOrder}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartScreen;
