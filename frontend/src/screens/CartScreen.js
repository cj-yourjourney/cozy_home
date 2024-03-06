import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { UseDispatch, useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { createOrder } from "../actions/orderActions";
function CartScreen() {
  const productId = useParams().id;

  // Use useLocation to get the search string from the URL
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // // Get the qty parameter from the URL
  // const qty = searchParams.get("qty");

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price), 0);

  // Check if totalPrice is a number before using toFixed
  const formattedTotalPrice = isNaN(totalPrice) ? 0 : totalPrice.toFixed(2);

  useEffect(() => {
    if (productId) {
      console.log(productId);

      dispatch(addToCart(productId));
    }
  }, [dispatch, productId]);

  const removeHandler = (id) => {
    console.log(id);

    dispatch(removeFromCart(id));
  };

  const placeOrder = () => {
    
    console.log("check it out now");
    dispatch(
      createOrder({
        orderItems: cartItems,
        totalPrice: formattedTotalPrice,
      })
    );
    
  }

  return (
    <div>
      <h2>Cart Screen</h2>
      {cartItems &&
        cartItems.map((item) => (
          <div key={item.id}>
            <p>
              {item.name} - ${item.price}{" "}
              <button onClick={() => removeHandler(item.id)}>Remove</button>
            </p>
          </div>
        ))}
      <p>Total Price: ${formattedTotalPrice}</p>
      <button onClick={placeOrder}>Check out</button>
    </div>
  );
}

export default CartScreen;
