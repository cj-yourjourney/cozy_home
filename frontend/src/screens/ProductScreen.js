import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";
import StarRating from "../components/StarRating";
import DatePicker from "react-datepicker";

import {
  Container,
  Row,
  Col,
  Button,
  Image,
  ListGroup,
  Card,
} from "react-bootstrap";

function ProductScreen() {
  const productId = useParams().id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // set the check-in and check-out variables
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };
  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const addToCartHandler = (id, checkInDate, checkOutDate) => {
    // Format dates to ISO strings and extract date part
    const formattedCheckInDate = checkInDate.toISOString().split("T")[0];
    const formattedCheckOutDate = checkOutDate.toISOString().split("T")[0];

    const url = `/cart/${id}?check-in=${formattedCheckInDate}&check-out=${formattedCheckOutDate}`;

   
    navigate(url);
  };

  return (
    <>
      {loading && <Loader />}
      {error && <Message error={error} />}
      {product && (
        <>
          <h2>Product Page</h2>
          <Row className="product-details-container">
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={6} className="product-details">
              <h3>{product.name}</h3>
              <div className="rating-container">
                <StarRating rating={product.rating} />
                <span style={{ marginLeft: "5px" }}>{product.rating}</span>
              </div>

              <p>{product.description}</p>
              <p>${product.price}</p>
              <div className="date-picker-container">
                <DatePicker
                  selected={checkInDate}
                  onChange={handleCheckInDateChange}
                  placeholderText="Check-in date"
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                />
                <DatePicker
                  selected={checkOutDate}
                  onChange={handleCheckOutDateChange}
                  placeholderText="Check-out date"
                  selectsEnd
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={checkInDate}
                />
              </div>

              <Button
                className="add-to-cart-btn"
                onClick={() =>
                  addToCartHandler(product.id, checkInDate, checkOutDate)
                }
                disabled={!checkInDate || !checkOutDate}
              >
                Add to Cart
              </Button>
            </Col>
          </Row>

          {product.reviews && product.reviews.length > 0 ? (
            <div className="mt-4">
              <h3>Reviews:</h3>
              <ListGroup variant="flush">
                {product.reviews.map((review, index) => (
                  <ListGroup.Item key={review.id}>
                    <strong>{review.name}</strong>
                    <StarRating rating={review.rating} />
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ) : (
            <p>No reviews available for this product.</p>
          )}
        </>
      )}
    </>
  );
}

export default ProductScreen;
