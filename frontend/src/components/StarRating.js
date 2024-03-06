import React from "react";
import Rating from "react-rating-stars-component";

const StarRating = ({ rating }) => {
  return (
    <Rating
      count={5}
      size={24}
      value={rating}
      edit={false} // Set to true if you want users to be able to interactively change the rating
      isHalf={true} // Set to true if you want to use half stars
      emptyIcon={<i className="far fa-star" />}
      halfIcon={<i className="fa fa-star-half-alt" />}
      fullIcon={<i className="fa fa-star" />}
      activeColor="#ffd700"
    />
  );
};

export default StarRating;
