import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "./Rating.css";

export default function Rating({ value = 0, onChange }) {
  const stars = [];

  const handleClick = (i) => {
    if (onChange) onChange(i);
  };

  for (let i = 1; i <= 5; i++) {
    const Icon =
      i <= Math.floor(value)
        ? FaStar
        : i - value < 1
        ? FaStarHalfAlt
        : FaRegStar;
    stars.push(
      <Icon key={i} onClick={() => handleClick(i)} className="rating-icon" />
    );
  }

  return <div className="rating">{stars}</div>;
}
