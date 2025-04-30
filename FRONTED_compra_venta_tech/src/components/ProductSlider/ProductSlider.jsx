import React, { useRef } from "react";
import "./ProductSlider.css";
import ApiImage from "../Post/ApiImage";
import { Link } from "react-router-dom";

const ProductSlider = ({ products }) => {
  console.log(products);

  const sliderRef = useRef();

  const scroll = (direction) => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.offsetWidth / 3;
    sliderRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="product-slider-wrapper">
      <button
        className="slider-arrow arrow-left"
        onClick={() => scroll("left")}
      >
        ◀
      </button>
      <div className="product-slider" ref={sliderRef}>
        {products.map((product) => (
          <div key={product.id} className="product-slider-item">
            <Link to={"/producto/" + product.id}>
              <ApiImage
                name={product.photo}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg"
              />
            </Link>

            <h3>{product.name}</h3>
          </div>
        ))}
      </div>
      <button
        className="slider-arrow arrow-right"
        onClick={() => scroll("right")}
      >
        ▶
      </button>
    </div>
  );
};

export default ProductSlider;
