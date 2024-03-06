import React from 'react'
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import StarRating from "../components/StarRating";


function ProductCard({product}) {
  return (
    <div>
      {" "}
      <Card className="mb-4">
        <Link to={`/product/${product.id}/`}>
          <Card.Img variant="top" src={product.image} id="product-card-img" />
        </Link>
        <Card.Body>
          <Link to={`/product/${product.id}/`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text> ${product.price} </Card.Text>
          <Card.Text id="product-card-text">
            {product.rating && (
              <>
                <StarRating rating={product.rating} />
                <span style={{ marginLeft: "5px" }}>{product.rating}</span>
              </>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard