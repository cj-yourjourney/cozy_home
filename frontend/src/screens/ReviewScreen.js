import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createProductReview } from "../actions/productActions";

function ReviewScreen() {
  const dispatch = useDispatch();
  const productId = useParams().id;
  console.log("productId", productId);

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success, error } = productReviewCreate;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const sumbitHandler = (e) => {
    e.preventDefault();
    console.log("review got submitted!");
    dispatch(createProductReview(productId, { rating, comment }));
  };

  return (
    <div>
      <h2>Write a Review</h2>
      <form onSubmit={sumbitHandler}>
        <div>
          <label>Rating </label>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>
        <div>
          <label>Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit Review</button>
      </form>
      {success && (
        <div>
          <p>Review created successfully!</p>
          {/* You can add additional styling or redirection logic if needed */}
        </div>
      )}

      {error && (
        <div>
          <p>Error: {error}</p>
          {/* You can add additional styling or handle the error as needed */}
        </div>
      )}
    </div>
  );
}

export default ReviewScreen;
