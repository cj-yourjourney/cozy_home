import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import { Card, Container, Spinner } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";


const MyOrdersScreen = () => {
  const dispatch = useDispatch();

  // Get user info from the Redux store
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Get order info from the Redux store
  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading, error, orders } = orderListMy;

  useEffect(() => {
    // Fetch orders for the current user when the component mounts
    if (userInfo) {
      dispatch(listMyOrders());
    }
  }, [dispatch, userInfo]);

  return (
    <Container className="mt-4">
      <h2>My Orders</h2>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {orders && (
        <div>
          {orders.map((order) => (
            <Card key={order.id} className="mt-3">
              <Card.Body>
                <Card.Title>Order ID: {order.id}</Card.Title>
                <Card.Text>Total Price: ${order.totalPrice}</Card.Text>
                <Card.Text>
                  Status: {order.isPaid ? "Paid" : "Not Paid"}
                </Card.Text>
                <Card.Text>
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </Card.Text>

                <div>
                  <h6>Order Items:</h6>
                  {order.orderItems.map((item) => (
                    <div key={item._id} className="mb-3">
                      <Card.Text>
                        {item.name} - ${item.price}
                      </Card.Text>
                      <Card.Text>Check-in: {item.check_in_date}</Card.Text>
                      <Card.Text>Check-out: {item.check_out_date}</Card.Text>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
     
    </Container>
  );
};

export default MyOrdersScreen;
