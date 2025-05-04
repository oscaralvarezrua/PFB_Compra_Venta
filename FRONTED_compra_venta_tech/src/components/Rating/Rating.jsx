import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./Rating.css";

export default function Rating({ value = 0, count = 0 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(value)) {
      stars.push(<FaStar key={i} />);
    } else if (i - value < 1) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <div className="rating">
      <span className="stars">{stars}</span>
      <span className="count">
        {" "}
        {count} valorac{count === 1 ? "ión" : "iones"}
      </span>
    </div>
  );
}
