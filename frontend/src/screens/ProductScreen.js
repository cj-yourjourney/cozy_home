import React ,{useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";
import  StarRating  from "../components/StarRating";
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

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = (id) => {
    navigate(`/cart/${productId}/`);
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
              <Button
                className="add-to-cart-btn"
                onClick={() => addToCartHandler(product.id)}
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
